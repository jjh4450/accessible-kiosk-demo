import { create } from "zustand";
import { OrderItem } from "../types/order";
import { MenuItem } from "../types/menu";

interface OrderState {
  orderItems: OrderItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orderItems: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.orderItems.find(
        (orderItem) => orderItem.id === item.id,
      );
      if (existingItem) {
        return {
          orderItems: state.orderItems.map((orderItem) =>
            orderItem.id === item.id
              ? { ...orderItem, quantity: orderItem.quantity + 1 }
              : orderItem,
          ),
        };
      }
      return { orderItems: [...state.orderItems, { ...item, quantity: 1 }] };
    }),
  removeItem: (itemId) =>
    set((state) => ({
      orderItems: state.orderItems.filter((item) => item.id !== itemId),
    })),
  updateItemQuantity: (itemId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          orderItems: state.orderItems.filter((item) => item.id !== itemId),
        };
      }
      return {
        orderItems: state.orderItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item,
        ),
      };
    }),
}));
