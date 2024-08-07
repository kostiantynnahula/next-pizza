'use server'

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate, VerificationUserTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

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

    await prisma.cart.update({
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

    const paymentData = await createPayment(cart.items, order.id.toString());

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
  
    const paymentUrl = paymentData.url;

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

export async function updateUserInfo(body: Prisma.UserCreateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const data: Partial<Prisma.UserCreateInput> = {
      email: body.email,
      fullname: body.fullname,
    };

    if (body.password) {
      data.password = hashSync(body.password, 10);
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data,
    });
  } catch (error) {
    console.log('Error [UPDATE_USER]', error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Email is not verified');
      }

      throw new Error('User already exists');
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        fullname: body.fullname,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendEmail(createdUser.email, 'Next Pizza / Confirm registration', VerificationUserTemplate({ code }));
  } catch (error) {
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
}