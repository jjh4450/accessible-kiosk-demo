import { useEffect, useRef } from "react";
import { menuItems } from "../../shared/data/menuData";
import MenuGrid from "../../components/Kiosk/MenuGrid";
import OrderSummary from "../../components/Kiosk/OrderSummary";
import { useCurrentPage } from "@/shared/utils/routerUtils";

import {
  kioskContainer,
  kioskContent,
  kioskSidebar,
  mainContent,
  startButton,
  welcomeContainer,
  welcomeTitle,
  welcomeSubtitle,
  dialogCSS,
} from "../../components/Kiosk/styles.css";


const Kiosk = () => {
  const currentPage = useCurrentPage();
  const selectedCategory = currentPage.category;
  const filteredMenu =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (!dlg.open) {
      if (typeof dlg.showModal === "function") {
        dlg.showModal();
      } else {
        dlg.setAttribute("open", "");
      }
    }
  }, []);

  const handleStart = () => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (typeof dlg.close === "function") {
      dlg.close("start");
    } else {
      dlg.removeAttribute("open");
    }
  };

  return (
    <div className={kioskContainer}>
      <div className={kioskContent}>
        <div className={mainContent}>
          <MenuGrid menuItems={filteredMenu} />
        </div>
        <aside className={kioskSidebar}>
          <OrderSummary />
        </aside>
      </div>

      <dialog ref={dialogRef} className={dialogCSS} aria-modal="true">
        <div className={welcomeContainer}>
          <h1 className={welcomeTitle}>Voice Touch 키오스크에 오신 것을 환영합니다</h1>
          <p className={welcomeSubtitle}>
            음성 인식과 터치 스크린으로 편리하게 주문하실 수 있습니다.
            <br />
            시작하기 버튼을 눌러 주문을 시작해주세요.
          </p>
          <button
            type="button"
            className={startButton}
            aria-label="주문 시작하기"
            onClick={handleStart}
          >
            시작하기
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Kiosk;
