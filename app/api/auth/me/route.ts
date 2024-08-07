import { NextResponse } from "next/server";
import { getUserSession } from "@/shared/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json({ message: 'You are not authorized' }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullname: true,
        email: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log('Error [GET]', error);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}