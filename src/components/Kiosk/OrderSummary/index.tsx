import { OrderItem } from '../../../shared/types/menu';
import { 
  orderSummaryContainer, 
  orderItemCard, 
  orderTotal, 
  orderButton, 
  emptyOrder,
  orderSummaryTitle,
  orderItems,
  itemInfo,
  itemName,
  itemPrice,
  quantityControls,
  quantityBtn,
  quantity,
  removeBtn,
  totalInfo,
  totalAmount
} from './styles.css';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  totalAmount: number;
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onOrder: () => void;
}

const OrderSummary = ({
  orderItems,
  totalAmount,
  onUpdateQuantity,
  onRemoveItem,
  onOrder
}: OrderSummaryProps) => {
  if (orderItems.length === 0) {
    return (
      <div className={orderSummaryContainer}>
        <h2 className={orderSummaryTitle}>주문 내역</h2>
        <div className={emptyOrder}>
          <p>주문할 메뉴를 선택해주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className={orderSummaryContainer}>
      <h2 className={orderSummaryTitle}>주문 내역</h2>
      
      <div className={orderItems}>
        {orderItems.map((orderItem) => (
          <div key={orderItem.menuItem.id} className={orderItemCard}>
            <div className={itemInfo}>
              <h4 className={itemName}>{orderItem.menuItem.name}</h4>
              <p className={itemPrice}>{orderItem.menuItem.price.toLocaleString()}원</p>
            </div>
            
            <div className={quantityControls}>
              <button 
                onClick={() => onUpdateQuantity(orderItem.menuItem.id, orderItem.quantity - 1)}
                className={quantityBtn}
              >
                -
              </button>
              <span className={quantity}>{orderItem.quantity}</span>
              <button 
                onClick={() => onUpdateQuantity(orderItem.menuItem.id, orderItem.quantity + 1)}
                className={quantityBtn}
              >
                +
              </button>
            </div>
            
            <button 
              onClick={() => onRemoveItem(orderItem.menuItem.id)}
              className={removeBtn}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      
      <div className={orderTotal}>
        <div className={totalInfo}>
          <span>총 금액:</span>
          <span className={totalAmount}>{totalAmount.toLocaleString()}원</span>
        </div>
      </div>
      
      <button className={orderButton} onClick={onOrder}>
        주문하기 ({totalAmount.toLocaleString()}원)
      </button>
    </div>
  );
};

export default OrderSummary;
