interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  // TODO: Implement payment creation

  return {
    id: `order-${details.orderId}-${new Date().getTime()}`,
    confirmation: {
      confirmationUrl: `http://localhost:3000/payment/${details.orderId}`,
    },
  };
}