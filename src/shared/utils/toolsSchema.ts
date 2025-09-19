// toolsSchema.ts
import { z } from "zod";

export const AddItemParams = z.object({ id: z.string().min(1) });
export const RemoveItemParams = z.object({ id: z.string().min(1) });
export const UpdateQtyParams = z.object({
    id: z.string().min(1),
    quantity: z.number().int().min(0),
});

/**
 * Returns OpenAI Realtime tool specs (JSON Schema)
 */
export function getToolSpecs() {
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
    ] as const;
}
