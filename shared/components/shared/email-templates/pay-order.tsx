import * as React from "react";

interface PayOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Readonly<PayOrderTemplateProps>> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Order, #{orderId}!</h1>

    <p>
      Pay the order price {totalAmount} $. Follow the{" "}
      <a href={paymentUrl}>link</a> for paymanets.
    </p>
  </div>
);
