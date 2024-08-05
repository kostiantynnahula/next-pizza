'use server'

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { Resend } from "resend";

export async function createOrder(data: CheckoutFormValues) {
  try {

    const cookieStore = cookies();

    const token = cookieStore.get('cartToken')?.value;

    if (!token) {
      throw new Error('Cart token not found');
    }

    const cart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token,
      }
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    if (cart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: cart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(cart.items),
        token,
        userId: 1,
      },
    });

    const updatedCart = await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    const paymentData = await createPayment({
      orderId: order.id,
      amount: order.totalAmount,
      description: `Payment for order #${order.id}`,
    });

    if (!paymentData) {
      throw new Error('Payment creation failed');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });
  
    const paymentUrl = paymentData.confirmation.confirmationUrl;

    // TODO: Implement payment gateway (Stripe link)
    await sendEmail('kostyannagula@gmail.com', `Next pizza / pay the order #${order.id}`, PayOrderTemplate({
      orderId: order.id,
      totalAmount: order.totalAmount,
      paymentUrl,
    }));

    return paymentUrl;
  } catch (e) {
    console.log('[CreateOrder] Server error', e)
  }
}