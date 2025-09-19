import { useOrderStore } from "../../../shared/store/order";
import {
  orderSummaryContainer,
  orderItemCard,
  orderTotal,
  orderButton,
  emptyOrder,
  orderSummaryTitle,
  orderItemsContainer,
  itemInfo,
  itemName,
  itemPrice,
  quantityControls,
  quantityBtn,
  quantity,
  removeBtn,
  totalInfo,
  totalAmountText,
} from "./styles.css";

const OrderSummary = () => {
  const { orderItems, updateItemQuantity, removeItem } = useOrderStore();

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleOrder = () => {
    if (orderItems.length === 0) return;

    // 주문 처리 로직 (나중에 OpenAI API와 연동)
    console.log("주문 완료:", orderItems);
    alert("주문이 완료되었습니다!");
    useOrderStore.setState({ orderItems: [] });
  };

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

      <div className={orderItemsContainer}>
        {orderItems.map((orderItem) => (
          <div key={orderItem.id} className={orderItemCard}>
            <div className={itemInfo}>
              <h4 className={itemName}>{orderItem.name}</h4>
              <p className={itemPrice}>{orderItem.price.toLocaleString()}원</p>
            </div>

            <div className={quantityControls}>
              <button
                onClick={() =>
                  updateItemQuantity(orderItem.id, orderItem.quantity - 1)
                }
                className={quantityBtn}
              >
                -
              </button>
              <span className={quantity}>{orderItem.quantity}</span>
              <button
                onClick={() =>
                  updateItemQuantity(orderItem.id, orderItem.quantity + 1)
                }
                className={quantityBtn}
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(orderItem.id)}
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
          <span className={totalAmountText}>
            {totalAmount.toLocaleString()}원
          </span>
        </div>
      </div>

      <button className={orderButton} onClick={handleOrder}>
        주문하기 ({totalAmount.toLocaleString()}원)
      </button>
    </div>
  );
};

export default OrderSummary;
