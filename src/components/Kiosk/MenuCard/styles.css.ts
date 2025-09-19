import { style } from "@vanilla-extract/css";

export const menuCardContainer = style({
  position: "relative",
  background: "white",
  borderRadius: "15px",
  padding: "20px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  zIndex: 1,

  ":hover": {
    transform: "scale(0.98)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 10,
  },
});

export const menuImage = style({
  width: "100%",
  height: "200px",
  borderRadius: "10px",
  overflow: "hidden",
  marginBottom: "15px",
  background: "#f8f9fa",
});

export const imgStyles = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const menuInfo = style({
  flex: "1",
  marginBottom: "15px",
});

export const menuName = style({
  margin: "0 0 10px 0",
  color: "#333",
  fontSize: "1.3rem",
  fontWeight: "600",
});

export const menuDescription = style({
  margin: "0 0 10px 0",
  color: "#666",
  fontSize: "0.95rem",
  lineHeight: "1.4",
});

export const menuPrice = style({
  fontSize: "1.2rem",
  fontWeight: "700",
  color: "#667eea",
  marginBottom: "10px",
});

export const addButton = style({
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "1.1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",

  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  },

  ":active": {
    transform: "translateY(0)",
  },
});

export const allergens = style({
  fontSize: "0.9rem",
  color: "#666",
  marginTop: "5px",
});

export const calories = style({
  fontSize: "0.9rem",
  color: "#666",
  marginTop: "5px",
});
