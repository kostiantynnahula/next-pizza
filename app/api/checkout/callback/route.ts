import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components";
import { getEventOrderId, sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {  
    const orderId = await getEventOrderId(req);

    const order = await prisma.order.findFirst({
      where: {
        id: Number(orderId),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }
    
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: OrderStatus.SUCCEEDED,
      },
    });

    const items = JSON.parse(order.items as string) as CartItemDTO[];
    
    await sendEmail(
      order.email,
      'Next Pizza | Order was paid successfully',
      OrderSuccessTemplate({
        orderId: order.id,
        items,
      }),
    );

  } catch (e) {
    console.log('Checkout callback error', e);
    return NextResponse.json({ error: 'Server error' });
  }
}