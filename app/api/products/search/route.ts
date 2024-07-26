import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma-client';

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('query') || '';

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    },
    take: 5
  });

  return NextResponse.json(products);
}