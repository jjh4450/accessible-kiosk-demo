import {
  createGlobalTheme,
  globalFontFace,
  StyleRule,
} from "@vanilla-extract/css";
import YeongdoBold from "/font/YeongdoOTF-Bold.woff2";
import YeongdoRegular from "/font/YeongdoOTF-Regular.woff2";
import YeongdoHeavy from "/font/YeongdoOTF-Heavy.woff2";

globalFontFace("YeongdoOTF", {
  src: `url(${YeongdoRegular}) format("woff2")`,
  fontWeight: "400",
  fontStyle: "normal",
});

globalFontFace("YeongdoOTF", {
  src: `url(${YeongdoBold}) format("woff2")`,
  fontWeight: "700",
  fontStyle: "normal",
});

globalFontFace("YeongdoOTF", {
  src: `url(${YeongdoHeavy}) format("woff2")`,
  fontWeight: "900",
  fontStyle: "normal",
});

export const vars = createGlobalTheme("#root", {
  color: {
    blue1: "#0781CD",
    blue2: "#029FD7",
    blue3: "#C9CEE1",
    green1: "#04D1C3",
    green2: "#6AE5AE",
    green3: "#B1F492",
    white: "#FFFFFF",
    background: "#E1E1E1",
  },
  font: {
    pretendard: "NotoSansLatin, pretendard, sans-serif",
  },
});

export const safeHoverOption = "(hover: hover) and (pointer: fine)";

export const safeHover = (hoverStyles: StyleRule): StyleRule => ({
  "@media": {
    [safeHoverOption]: {
      ":hover": hoverStyles,
    },
  },
});
