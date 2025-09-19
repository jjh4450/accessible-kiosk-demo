import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Manages a WebRTC session with OpenAI Realtime over a data channel.
 * Exposes session lifecycle, event stream, and message send helpers.
 * @param {Object} options
 * @param {string} [options.tokenEndpoint="/token"] - Server endpoint that returns an ephemeral key as { value: string }
 * @param {string} [options.baseUrl="https://api.openai.com/v1/realtime/calls"] - Realtime REST endpoint for SDP offer/answer
 * @param {string} [options.model="gpt-realtime"] - Realtime model identifier
 * @param {RTCConfiguration} [options.rtcConfig] - Optional RTCPeerConnection config (e.g., {"iceServers":[...]})
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
} = {}) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [events, setEvents] = useState([]);
  const pcRef = useRef(null);
  const dcRef = useRef(null);
  const localMicTrackRef = useRef(null);
  const audioRef = useRef(null);

  /**
   * Starts a WebRTC session with Realtime: fetches ephemeral key, opens mic,
   * creates data channel, exchanges SDP, and routes remote audio to audioRef.
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
    });

    dc.addEventListener("open", () => {
      setIsSessionActive(true);
      setEvents([]);
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
  }, [tokenEndpoint, baseUrl, model, rtcConfig]);

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

    setIsSessionActive(false);
    setEvents([]);
  }, []);

  /**
   * Sends a raw event over the data channel. Adds an event_id if missing.
   * Client-only timestamp is appended to local state copy, not to the wire payload.
   * @param {object} message
   * @returns {void}
   */
  const sendClientEvent = useCallback((message) => {
    const dc = dcRef.current;
    if (!dc || dc.readyState !== "open") return;

    const event_id = message.event_id || crypto.randomUUID();
    const wirePayload = { ...message, event_id };
    dc.send(JSON.stringify(wirePayload));

    const localCopy = {
      ...wirePayload,
      timestamp: new Date().toLocaleTimeString(),
    };
    setEvents((prev) => [localCopy, ...prev]);
  }, []);

  /**
   * Sends a user text message and triggers a response from the model.
   * @param {string} text
   * @returns {void}
   */
  const sendTextMessage = useCallback(
    (text) => {
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
