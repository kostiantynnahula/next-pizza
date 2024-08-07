import { Prisma } from "@prisma/client";
import { stripeClient } from './client';
import Stripe from "stripe";

interface LineItem {
  price: string;
  quantity: number;
}

type CartItem = Prisma.CartItemGetPayload<{
  include: {
    ingredients: true,
    productItem: {
      include: {
        product: true,
      },
    },
  },
}>;

export const getLineItems = async (cartItems: CartItem[], orderId: string): Promise<LineItem[]> => {
  try {
    const lineItems: LineItem[] = [];

    const stripe = await stripeClient();

    for await (const { productItem } of cartItems) {
      const { price, product } = productItem;

      const productPrice = await stripe.prices.create({
        unit_amount: price * 100,
        currency: 'usd',
        product_data: {
          name: product.name,
        },
      });

      lineItems.push({
        price: productPrice.id,
        quantity: 1,
      });
    }
    
    return lineItems;
  } catch (error) {
    throw new Error("Line items creation failed");
  }
};

export const createPayment = async (cartItems: CartItem[], orderId: string): Promise<Stripe.Response<Stripe.PaymentLink>> => {
  try {
    const stripe = await stripeClient();
  
    const lineItems = await getLineItems(cartItems, orderId);

    return await stripe.paymentLinks.create({
      line_items: lineItems,
      metadata: {
        orderId,
      },
      after_completion: {
        type: 'redirect',
        redirect: {
          url: process.env.NEXT_APP_URL || '',
        }
      }
    });

  } catch (error) {
    throw new Error("Payment link creation failed");
    
  }
}
