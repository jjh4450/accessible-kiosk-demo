import { style as createStyle, keyframes } from "@vanilla-extract/css";

const fadeUpKeyframes = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(20px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const pageContainer = createStyle({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #FF6A3D 0%, #2E2E2E 50%, #8A2BE2 100%)",
  position: "relative",
});

export const headerWrapper = createStyle({
  animation: `${fadeUpKeyframes} 0.6s ease-out forwards`,
});

export const mainTitle = createStyle({
  fontSize: "3rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "#FFFFFF",
  textAlign: "center",
});

export const subtitle = createStyle({
  fontSize: "1.2rem",
  color: "#E5E5E5",
  marginBottom: "2rem",
  textAlign: "center",
  animation: `${fadeUpKeyframes} 0.6s ease-out forwards`,
  animationDelay: "0.2s",
});

export const cardsGrid = createStyle({
  display: "grid",
  gap: "1.5rem",
  maxWidth: "1200px",
  width: "100%",
  padding: "0 1rem",
  "@media": {
    "screen and (min-width: 640px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "screen and (min-width: 1024px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});

// Card styles
export const cardContainer = createStyle({
  position: "relative",
  padding: "1.5rem",
  borderRadius: "12px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  ":hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  },
});

export const cardContent = createStyle({
  position: "relative",
});

export const cardTitle = createStyle({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#FFFFFF",
  marginBottom: "0.5rem",
});

export const cardDescription = createStyle({
  fontSize: "0.9rem",
  color: "#E0E0E0",
  lineHeight: 1.5,
});

export const link = createStyle({
  color: "white",
  textDecoration: "underline",
});
