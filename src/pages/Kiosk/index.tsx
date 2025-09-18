import { useState } from 'react';
import { MenuItem, OrderItem } from '../../shared/types/menu';
import { menuItems } from '../../shared/data/menuData';
import MenuGrid from '../../components/Kiosk/MenuGrid';
import OrderSummary from '../../components/Kiosk/OrderSummary';
import { useCurrentPage } from '@/shared/utils/routerUtils';
import { 
  kioskContainer, 
  kioskContent, 
  kioskSidebar,
  mainContent
} from '../../components/Kiosk/styles.css';

const Kiosk = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const currentPage = useCurrentPage();
  const selectedCategory = currentPage.category;
  
  const filteredMenu = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToOrder = (menuItem: MenuItem) => {
    const existingItemIndex = orderItems.findIndex(
      item => item.menuItem.id === menuItem.id
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += 1;
      setOrderItems(updatedItems);
    } else {
      const newOrderItem: OrderItem = {
        menuItem,
        quantity: 1,
        size: menuItem.size || 'medium',
        temperature: menuItem.temperature || 'hot'
      };
      setOrderItems([...orderItems, newOrderItem]);
    }
  };

  const removeFromOrder = (menuItemId: string) => {
    setOrderItems(orderItems.filter(item => item.menuItem.id !== menuItemId));
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(menuItemId);
      return;
    }

    const updatedItems = orderItems.map(item =>
      item.menuItem.id === menuItemId
        ? { ...item, quantity }
        : item
    );
    setOrderItems(updatedItems);
  };

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + (item.menuItem.price * item.quantity),
    0
  );

  const handleOrder = () => {
    if (orderItems.length === 0) return;
    
    // 주문 처리 로직 (나중에 OpenAI API와 연동)
    console.log('주문 완료:', orderItems);
    alert('주문이 완료되었습니다!');
    setOrderItems([]);
  };

  return (
    <div className={kioskContainer}>
      <div className={kioskContent}>
        <div className={mainContent}>
          <MenuGrid 
            menuItems={filteredMenu}
            onAddToOrder={addToOrder}
          />
        </div>

        <aside className={kioskSidebar}>
          <OrderSummary
            orderItems={orderItems}
            totalAmount={totalAmount}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromOrder}
            onOrder={handleOrder}
          />
        </aside>
      </div>
    </div>
  );
};

export default Kiosk;
