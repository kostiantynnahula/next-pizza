import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import * as React from "react";

interface OrderSuccessProps {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Readonly<OrderSuccessProps>> = ({
  orderId,
  items,
}) => (
  <div>
    <h1>Thank you for the payment!</h1>

    <p>Your order #{orderId} is successfully paid. The list of items:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} $ *{" "}
          {item.quantity} = {item.productItem.price * item.quantity} $
        </li>
      ))}
    </ul>
  </div>
);
