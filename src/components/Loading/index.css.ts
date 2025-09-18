import { style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
});

export const styledLottie = style({
  width: "20%",
  height: "auto",
});

export const text = styleVariants({
  base: {
    marginTop: "20px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  mobile: {
    fontSize: "16px",
  },
  tablet: {
    fontSize: "17px",
  },
  desktop: {
    fontSize: "18px",
  },
});

export const responsiveText = style({
  "@media": {
    "screen and (max-width: 600px)": {
      fontSize: "16px",
    },
    "screen and (min-width: 601px) and (max-width: 1200px)": {
      fontSize: "17px",
    },
    "screen and (min-width: 1201px)": {
      fontSize: "18px",
    },
  },
});
