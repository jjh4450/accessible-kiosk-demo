import { useOrderStore } from "../store/order";

export const initializeApi = () => {
  // Zustand 스토어 구독
  useOrderStore.subscribe((state) => {
    console.log("Order state changed:", state.orderItems);
  });
};

// 향후 API 호출 함수들...
// 예: export const fetchMenus = async () => { ... }
