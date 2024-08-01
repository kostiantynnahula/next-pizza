import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  types?: string;
  ingredients?: string;
  from?: string;
  to?: string;
  limit?: string;
  page?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

const DEFAULT_LIMIT = 12;
const DEFAULT_PAGE = 1;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.types?.split(",").map(Number);
  const ingredientsArr = params.ingredients?.split(",").map(Number);

  const minPrice = Number(params.from) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.to) || DEFAULT_MAX_PRICE;

  const limit = Number(params.limit || DEFAULT_LIMIT);
  const page = Number(params.page || DEFAULT_PAGE);

  const categories = await prisma.category.findMany({
    include: {
      products: {
        where: {
          ingredients: ingredientsArr ? {
            some: {
              id: {
                in: ingredientsArr,
              },
            },
          } : undefined,
          items: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            }
          },
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
}