import Lottie from "lottie-light-react";
import { useEffect, useRef, useState } from "react";
import * as styles from "./index.css.ts";

import loadingAnimation from "@/assets/loading.json";

const loadingTexts = [
  "Rolling the dough for the perfect churro...",
  "Adding an extra sprinkle of sugar magic...",
  "Dipping churros in chocolate dreams...",
  "Twisting up a sticky sweet surprise...",
  "Caramelizing the moment, hold tight...",
  "Churro-fying your experience, just a sec...",
  "Sticky goodness is almost ready...",
  "Cinnamon swirl in progress, hang tight!",
  "Glazing your churro dreams, almost there...",
  "Heating up the fryer, stay with us...",
];

export function Loading() {
  const getRandomText = () =>
    loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
  const [text, setText] = useState(getRandomText());
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setText((prevText) => {
        const baseText = prevText.replace(/\.+$/, "");
        const dots = prevText.match(/\.+$/)?.[0] || "";
        return baseText + (dots.length >= 3 ? "" : dots + ".");
      });
    }, 500);

    return () => {
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.styledLottie}>
        <Lottie animationData={loadingAnimation} />
      </div>
      <p className={`${styles.text} ${styles.responsiveText}`}>{text}</p>
    </div>
  );
}
