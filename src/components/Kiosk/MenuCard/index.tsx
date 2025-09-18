import { MenuItem } from '../../../shared/types/menu';
import { 
  menuCardContainer, 
  menuImage, 
  menuInfo, 
  menuName, 
  menuDescription, 
  menuPrice, 
  addButton,
  allergens,
  calories
} from './styles.css';

interface MenuCardProps {
  menuItem: MenuItem;
  onAddToOrder: (menuItem: MenuItem) => void;
}

const MenuCard = ({ menuItem, onAddToOrder }: MenuCardProps) => {
  const handleAddToOrder = () => {
    onAddToOrder(menuItem);
  };

  return (
    <div className={menuCardContainer}>
      <div className={menuImage}>
        <img 
          src={menuItem.image} 
          alt={menuItem.name}
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지로 대체
            e.currentTarget.src = '/src/assets/menu_images/ico_cafe.png';
          }}
        />
      </div>
      
      <div className={menuInfo}>
        <h3 className={menuName}>{menuItem.name}</h3>
        <p className={menuDescription}>{menuItem.description}</p>
        <div className={menuPrice}>{menuItem.price.toLocaleString()}원</div>
        
        {menuItem.allergens && menuItem.allergens.length > 0 && (
          <div className={allergens}>
            알레르기: {menuItem.allergens.join(', ')}
          </div>
        )}
        
        {menuItem.calories && (
          <div className={calories}>
            칼로리: {menuItem.calories}kcal
          </div>
        )}
      </div>
      
      <button className={addButton} onClick={handleAddToOrder}>
        주문하기
      </button>
    </div>
  );
};

export default MenuCard;
