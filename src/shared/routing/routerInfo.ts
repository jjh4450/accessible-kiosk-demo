import { routerInfoType } from "../types/routing.ts";

export const routerInfo: routerInfoType[] = [
  {
    path: "/",
    element: import("@/pages/Kiosk"),
    korean: "전체",
    expose: true,
    category: "all"
  },
  {
    path: "/coffee",
    element: import("@/pages/Kiosk"),
    korean: "커피",
    expose: true,
    category: "coffee"
  },
  {
    path: "/tea",
    element: import("@/pages/Kiosk"),
    korean: "차",
    expose: true,
    category: "tea"
  },
  {
    path: "/juice",
    element: import("@/pages/Kiosk"),
    korean: "주스",
    expose: true,
    category: "juice"
  },
  {
    path: "/ade",
    element: import("@/pages/Kiosk"),
    korean: "에이드",
    expose: true,
    category: "ade"
  },
  {
    path: "/dessert",
    element: import("@/pages/Kiosk"),
    korean: "디저트",
    expose: true,
    category: "dessert"
  }
];

export default routerInfo;
