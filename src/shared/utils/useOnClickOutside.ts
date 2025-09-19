import { RefObject, useEffect } from "react";

/**
 * targetRef가 가리키는 엘리먼트 바깥을 클릭하면 handler를 호출
 */
export function useOnClickOutside<T extends HTMLElement>(
  targetRef: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      if (
        !targetRef.current ||
        targetRef.current.contains(event.target as Node)
      ) {
        return;
      }

      handler(event);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [targetRef, handler]);
}
