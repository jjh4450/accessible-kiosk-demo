import { menuItems } from "../../shared/data/menuData";
import MenuGrid from "../../components/Kiosk/MenuGrid";
import OrderSummary from "../../components/Kiosk/OrderSummary";
import { useCurrentPage } from "@/shared/utils/routerUtils";
import {
  kioskContainer,
  kioskContent,
  kioskSidebar,
  mainContent,
} from "../../components/Kiosk/styles.css";

const Kiosk = () => {
  const currentPage = useCurrentPage();
  const selectedCategory = currentPage.category;

  const filteredMenu =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

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
    </div>
  );
};

export default Kiosk;
