import { useMemo, useEffect } from "react";
import { useRealtimeSession } from "@shared/utils/useRealtimeSession";
import { useOrderStore } from "@shared/store/useOrderStore";
import { menuItems, searchMenu } from "@shared/data/menuData";
import { MenuItem } from "@shared/types/menu";

export const useKioskSession = () => {
  const {
    startSession: startRealtimeSession,
    sendClientEvent,
    ...sessionState
  } = useRealtimeSession();

  const { addItem, removeItem, updateItemQuantity, updateItem } =
    useOrderStore();

  const toolExecutors = useMemo(
    () => ({
      searchMenu: ({ query }: { query: string }): MenuItem[] =>
        searchMenu(query),
      addItem: ({ item }: { item: MenuItem }) => addItem(item),
      removeItem: ({ itemId }: { itemId: string }) => removeItem(itemId),
      updateItemQuantity: ({
        itemId,
        quantity,
      }: {
        itemId: string;
        quantity: number;
      }) => updateItemQuantity(itemId, quantity),
    }),
    [addItem, removeItem, updateItem],
  );

  useEffect(() => {
    // ... 기존 tool.call 처리 로직 ...
  }, [sessionState.events, toolExecutors, sendClientEvent]);

  /**
   * 키오스크용 음성 주문 세션을 시작합니다. (프롬프트 ID 사용)
   */
  const startKioskSession = async () => {
    // 동적 메뉴 목록 데이터는 여전히 생성합니다.
    const availableMenuString = JSON.stringify(
      menuItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
      })),
    );

    // startRealtimeSession 호출 시, prompt 객체와 context 객체를 전달합니다.
    await startRealtimeSession({
      prompt: {
        id: "pmpt_68cd19ed4b648195b66d7f507afb73410112fdd6f0ae3eab",
        version: "4",
      },
      context: {
        menu_list: availableMenuString,
      },
    });
  };

  return {
    ...sessionState,
    startKioskSession,
  };
};
