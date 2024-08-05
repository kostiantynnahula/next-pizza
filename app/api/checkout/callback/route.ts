import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// TODO: Refactor according to stripe api
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as any;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.orderId),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }
    
    const isSuccessful = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSuccessful? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order.items as string) as CartItemDTO[];
    
    if (isSuccessful) {
      await sendEmail(
        order.email,
        'Next Pizza | Order was paid successfully',
        OrderSuccessTemplate({
          orderId: order.id,
          items,
        }),
      );
    } else {
      await sendEmail(
        order.email,
        'Next Pizza | Order was cancelled',
        `Your order #${order.id} was cancelled`,
      );
    }

  } catch (e) {
    console.log('Checkout callback error', e);
    return NextResponse.json({ error: 'Server error' });
  }
}