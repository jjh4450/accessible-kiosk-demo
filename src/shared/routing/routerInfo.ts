import { routerInfoType } from "../types/routing.ts";

export const routerInfo: routerInfoType[] = [
  {
    path: "/",
    element: import("@/pages/Default"),
    korean: "메인",
    expose: true,
  },
];

export default routerInfo;
