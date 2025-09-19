// toolRegistry.ts
import { AddItemParams, RemoveItemParams, UpdateQtyParams } from "./toolsSchema";
import { useOrderStore } from "@/shared/store/useOrderStore";
import { menuItems } from "@/shared/data/menuData";

/**
 * Execute a function tool by name with JSON string args and return stringified result.
 */
export async function executeTool(name: string, argsJson: string): Promise<string> {
    const { addItem, removeItem, updateItemQuantity } = useOrderStore.getState();

    if (name === "add_item") {
        const args = AddItemParams.parse(JSON.parse(argsJson));
        const item = menuItems.find((m) => m.id === args.id);
        if (!item) throw new Error("Item not found");
        addItem(item);
        return JSON.stringify({ ok: true });
    }

    if (name === "remove_item") {
        const args = RemoveItemParams.parse(JSON.parse(argsJson));
        removeItem(args.id);
        return JSON.stringify({ ok: true });
    }

    if (name === "update_item_quantity") {
        const args = UpdateQtyParams.parse(JSON.parse(argsJson));
        updateItemQuantity(args.id, args.quantity);
        return JSON.stringify({ ok: true });
    }

    throw new Error("Unknown tool");
}
