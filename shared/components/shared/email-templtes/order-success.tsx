import { CartItemDTO } from "@/shared/services/dto/cart.dto";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccess: React.FC<Props> = ({ orderId, items }) => {
  return (
    <div>
      <h1>Спасибо за покупку! 🎉 </h1>
      <p> Ваш заказ #{orderId} оплачен. Список товаров:</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price} ₽ х{" "}
            {item.quantity} шт. = {item.productItem.price * item.quantity} ₽
          </li>
        ))}
      </ul>
    </div>
  );
};
