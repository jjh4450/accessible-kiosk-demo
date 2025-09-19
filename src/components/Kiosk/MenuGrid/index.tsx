import { MenuItem } from "../../../shared/types/menu";
import MenuCard from "../MenuCard";
import { menuGridContainer } from "./styles.css";

interface MenuGridProps {
  menuItems: MenuItem[];
}

const MenuGrid = ({ menuItems }: MenuGridProps) => {
  return (
    <div className={menuGridContainer}>
      {menuItems.map((item) => (
        <MenuCard key={item.id} menuItem={item} />
      ))}
    </div>
  );
};

export default MenuGrid;
