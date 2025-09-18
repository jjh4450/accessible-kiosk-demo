import { MenuItem } from '../../../shared/types/menu';
import MenuCard from '../MenuCard';
import { menuGridContainer } from './styles.css';

interface MenuGridProps {
  menuItems: MenuItem[];
  onAddToOrder: (menuItem: MenuItem) => void;
}

const MenuGrid = ({ menuItems, onAddToOrder }: MenuGridProps) => {
  return (
    <div className={menuGridContainer}>
      {menuItems.map((item) => (
        <MenuCard
          key={item.id}
          menuItem={item}
          onAddToOrder={onAddToOrder}
        />
      ))}
    </div>
  );
};

export default MenuGrid;
