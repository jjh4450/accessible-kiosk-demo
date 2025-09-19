import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Manages a WebRTC session with OpenAI Realtime over a data channel.
 * Includes optional Function Calling plumbing for cart actions.
 * @param {Object} options
 * @param {string} [options.tokenEndpoint="/token"] - Server endpoint that returns an ephemeral key as { value: string }
 * @param {string} [options.baseUrl="https://api.openai.com/v1/realtime/calls"] - Realtime REST endpoint for SDP offer/answer
 * @param {string} [options.model="gpt-realtime"] - Realtime model identifier
 * @param {RTCConfiguration} [options.rtcConfig] - Optional RTCPeerConnection config (e.g., {"iceServers":[...]})
 * @param {Object} [options.tools] - Optional function-calling handlers
 * @param {(id: string) => Promise<void>|void} [options.tools.addItemById] - Adds one unit of the item by id
 * @param {(id: string) => Promise<void>|void} [options.tools.removeItemById] - Removes the item by id
 * @param {(id: string, quantity: number) => Promise<void>|void} [options.tools.updateItemQuantity] - Sets quantity for the item id (0 removes)
 * @param {(id: string) => any|null} [options.menuLookup] - Optional resolver that returns a menu item object for id (if your addItem handler needs a full object)
 * @param {string} [options.instructions] - Optional system instructions sent with tool registration
 * @returns {{
 *  isSessionActive: boolean,
 *  events: any[],
 *  startSession: () => Promise<void>,
 *  stopSession: () => void,
 *  sendClientEvent: (message: object) => void,
 *  sendTextMessage: (text: string) => void,
 *  audioRef: import('react').RefObject<HTMLAudioElement>
 * }}
 */
export function useRealtimeSession({
                                     tokenEndpoint = "http://localhost:3000/token",
                                     baseUrl = "https://api.openai.com/v1/realtime/calls",
                                     model = "gpt-realtime",
                                     rtcConfig,
                                     tools,
                                     menuLookup,
                                     instructions = "You are a kiosk voice assistant. When the user orders or adjusts items, call the provided cart tools with correct ids. Keep confirmations brief.",
                                   } = {}) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const localMicTrackRef = useRef<MediaStreamTrack | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const callBuffersRef = useRef<Map<string, { name: string; args: string }>>(new Map());

  /**
   * Returns OpenAI tool specs for function calling.
   * @returns {any[]}
   */
  const getToolSpecs = useCallback(() => {
    return [
      {
        type: "function",
        name: "add_item",
        description: "Add one unit of a menu item to the cart by id.",
        parameters: {
          type: "object",
          properties: { id: { type: "string" } },
          required: ["id"],
          additionalProperties: false,
        },
      },
      {
        type: "function",
        name: "remove_item",
        description: "Remove an item from the cart by id.",
        parameters: {
          type: "object",
          properties: { id: { type: "string" } },
          required: ["id"],
          additionalProperties: false,
        },
      },
      {
        type: "function",
        name: "update_item_quantity",
        description: "Set item quantity in the cart (0 to remove).",
        parameters: {
          type: "object",
          properties: {
            id: { type: "string" },
            quantity: { type: "integer", minimum: 0 },
          },
          required: ["id", "quantity"],
          additionalProperties: false,
        },
      },
    ];
  }, []);

  /**
   * Executes a tool by name with JSON stringified args. Returns stringified result.
   * @param {string} name
   * @param {string} argsJson
   * @returns {Promise<string>}
   */
  const executeTool = useCallback(
      async (name: string, argsJson: string) => {
        const args = argsJson ? JSON.parse(argsJson) : {};
        const safeStr = (v: any) => (typeof v === "string" ? v : String(v ?? ""));
        const ensureHandlers =
            tools && (tools.addItemById || tools.removeItemById || tools.updateItemQuantity);

        if (!ensureHandlers) {
          return JSON.stringify({ ok: false, error: "Tool handlers are not configured" });
        }

        if (name === "add_item") {
          const id = safeStr(args.id);
          if (!id) return JSON.stringify({ ok: false, error: "id is required" });
          if (tools.addItemById) {
            if (menuLookup) {
              const item = menuLookup(id);
              if (item && typeof tools.addItemById === "function") {
                await tools.addItemById(id);
              } else {
                await tools.addItemById(id);
              }
            } else {
              await tools.addItemById(id);
            }
          }
          return JSON.stringify({ ok: true, action: "add_item", id });
        }

        if (name === "remove_item") {
          const id = safeStr(args.id);
          if (!id) return JSON.stringify({ ok: false, error: "id is required" });
          if (tools.removeItemById) await tools.removeItemById(id);
          return JSON.stringify({ ok: true, action: "remove_item", id });
        }

        if (name === "update_item_quantity") {
          const id = safeStr(args.id);
          const q = Number(args.quantity);
          if (!id || Number.isNaN(q) || q < 0) {
            return JSON.stringify({ ok: false, error: "id and non-negative quantity are required" });
          }
          if (tools.updateItemQuantity) await tools.updateItemQuantity(id, q);
          return JSON.stringify({ ok: true, action: "update_item_quantity", id, quantity: q });
        }

        return JSON.stringify({ ok: false, error: "Unknown tool" });
      },
      [tools, menuLookup],
  );

  /**
   * Starts a WebRTC session with Realtime: fetches ephemeral key, opens mic,
   * creates data channel, exchanges SDP, and routes remote audio to audioRef.
   * Also registers tools for Function Calling when the data channel opens.
   * @returns {Promise<void>}
   */
  const startSession = useCallback(async () => {
    const tokenRes = await fetch(tokenEndpoint);
    const tokenJson = await tokenRes.json();
    const EPHEMERAL_KEY = tokenJson.value;

    const pc = new RTCPeerConnection(rtcConfig);
    pcRef.current = pc;

    pc.ontrack = (e) => {
      if (audioRef.current) {
        audioRef.current.srcObject = e.streams[0];
      }
    };

    const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
    const [micTrack] = ms.getTracks();
    localMicTrackRef.current = micTrack;
    pc.addTrack(micTrack);

    const dc = pc.createDataChannel("oai-events");
    dcRef.current = dc;

    dc.addEventListener("message", (e) => {
      const ev = JSON.parse(e.data);
      if (!ev.timestamp) ev.timestamp = new Date().toLocaleTimeString();
      setEvents((prev) => [ev, ...prev]);

      if (ev?.type === "response.function_call.delta") {
        const callId = ev?.delta?.call_id;
        const name = ev?.delta?.name;
        const argsDelta = ev?.delta?.arguments ?? "";
        if (!callId) return;
        const prev = callBuffersRef.current.get(callId) ?? { name: name ?? "", args: "" };
        callBuffersRef.current.set(callId, {
          name: prev.name || name || "",
          args: prev.args + argsDelta,
        });
      }

      if (ev?.type === "response.function_call.completed") {
        const callId = ev?.call_id;
        if (!callId) return;
        const buf = callBuffersRef.current.get(callId);
        if (!buf) return;
        (async () => {
          try {
            const output = await executeTool(buf.name, buf.args || "{}");
            sendClientEvent({ type: "tool.output", call_id: callId, output });
            sendClientEvent({ type: "response.create" });
          } catch (err: any) {
            const output = JSON.stringify({ ok: false, error: err?.message ?? "Tool failed" });
            sendClientEvent({ type: "tool.output", call_id: callId, output });
            sendClientEvent({ type: "response.create" });
          } finally {
            callBuffersRef.current.delete(callId);
          }
        })();
      }
    });

    dc.addEventListener("open", () => {
      setIsSessionActive(true);
      setEvents([]);
      if (tools && (tools.addItemById || tools.removeItemById || tools.updateItemQuantity)) {
        sendClientEvent({
          type: "session.update",
          session: { instructions, tools: getToolSpecs() as any },
        });
      }
    });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
      method: "POST",
      body: offer.sdp,
      headers: {
        Authorization: `Bearer ${EPHEMERAL_KEY}`,
        "Content-Type": "application/sdp",
      },
    });

    const sdp = await sdpResponse.text();
    const answer = { type: "answer", sdp };
    await pc.setRemoteDescription(answer);
  }, [tokenEndpoint, baseUrl, model, rtcConfig, tools, instructions, getToolSpecs, executeTool]);

  /**
   * Stops the current session, closing the data channel, stopping local media,
   * and disposing the RTCPeerConnection.
   * @returns {void}
   */
  const stopSession = useCallback(() => {
    const dc = dcRef.current;
    if (dc && dc.readyState !== "closed") dc.close();
    dcRef.current = null;

    const pc = pcRef.current;
    if (pc) {
      pc.getSenders().forEach((s) => s.track && s.track.stop());
      pc.close();
    }
    pcRef.current = null;

    if (localMicTrackRef.current) {
      localMicTrackRef.current.stop();
      localMicTrackRef.current = null;
    }

    callBuffersRef.current.clear();
    setIsSessionActive(false);
    setEvents([]);
  }, []);

  /**
   * Sends a raw event over the data channel. Adds an event_id if missing.
   * Client-only timestamp is appended to local state copy, not to the wire payload.
   * @param {object} message
   * @returns {void}
   */
  const sendClientEvent = useCallback((message: any) => {
    const dc = dcRef.current;
    if (!dc || dc.readyState !== "open") return;

    const event_id = (message && message.event_id) || (crypto as any).randomUUID?.() || `${Date.now()}-${Math.random()}`;
    const wirePayload = { ...message, event_id };
    dc.send(JSON.stringify(wirePayload));

    const localCopy = { ...wirePayload, timestamp: new Date().toLocaleTimeString() };
    setEvents((prev) => [localCopy, ...prev]);
  }, []);

  /**
   * Sends a user text message and triggers a response from the model.
   * @param {string} text
   * @returns {void}
   */
  const sendTextMessage = useCallback(
      (text: string) => {
        const create = {
          type: "conversation.item.create",
          item: {
            type: "message",
            role: "user",
            content: [{ type: "input_text", text }],
          },
        };
        sendClientEvent(create);
        sendClientEvent({ type: "response.create" });
      },
      [sendClientEvent],
  );

  /**
   * Disposes resources on unmount to prevent leaks if a session is still active.
   * @returns {void}
   */
  useEffect(() => {
    return () => {
      try {
        stopSession();
      } catch {}
    };
  }, [stopSession]);

  return {
    isSessionActive,
    events,
    startSession,
    stopSession,
    sendClientEvent,
    sendTextMessage,
    audioRef,
  };
}
