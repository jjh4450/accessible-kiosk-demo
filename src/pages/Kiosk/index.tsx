import { useEffect, useRef, useState } from "react";
import { menuItems } from "../../shared/data/menuData";
import MenuGrid from "../../components/Kiosk/MenuGrid";
import OrderSummary from "../../components/Kiosk/OrderSummary";
import { useCurrentPage } from "@/shared/utils/routerUtils";
import { useRealtimeSession } from "@shared/utils/useRealtimeSession";

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
  const [isConnecting, setIsConnecting] = useState(false);

  // 1. useRealtimeSession 훅을 호출하여 세션 관리 기능 가져오기
  const { startSession, audioRef, isSessionActive } = useRealtimeSession();

  // Dialog를 마운트 시 한 번만 보여주기 위한 useEffect
  useEffect(() => {
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) {
      if (typeof dlg.showModal === "function") {
        dlg.showModal();
      } else {
        dlg.setAttribute("open", "");
      }
    }
  }, []);

  // 2. "시작하기" 버튼 핸들러 수정
  const handleStart = async () => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    setIsConnecting(true); // 3. 연결 시작 상태로 변경

    try {
      // 음성 세션 시작
      await startSession();

      // 성공 시 다이얼로그 닫기
      if (typeof dlg.close === "function") {
        dlg.close("start");
      } else {
        dlg.removeAttribute("open");
      }
    } catch (error) {
      // 4. 오류 처리
      console.error("음성 세션 시작에 실패했습니다:", error);
      alert(
        "음성 세션을 시작하는 데 실패했습니다. 마이크 권한을 확인하거나 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsConnecting(false); // 연결 시도 완료 후 상태 복원
    }
  };

  return (
    <div className={kioskContainer}>
      {/* 5. 서버 음성을 재생하기 위한 audio 요소 (사용자에게 보이지 않음) */}
      <audio ref={audioRef} autoPlay style={{ display: "none" }} />

      {/* (옵션) 세션 활성화 상태 표시기 */}
      {isSessionActive && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            background: "green",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          ● Voice ON
        </div>
      )}

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
          <h1 className={welcomeTitle}>
            Voice Touch 키오스크에 오신 것을 환영합니다
          </h1>
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
            disabled={isConnecting} // 연결 중 버튼 비활성화
          >
            {isConnecting ? "연결 중..." : "시작하기"}
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Kiosk;
