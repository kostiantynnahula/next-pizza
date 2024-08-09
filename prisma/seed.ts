import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';
import { categories, ingredients, products } from "./constants";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
  priceFrom = 1,
  priceTo = 10
}: {
  productId: number;
  pizzaType?: number;
  size?: number;
  priceFrom?: number;
  priceTo?: number;
}) => {
  return {
    productId,
    price: randomDecimalNumber(priceFrom, priceTo),
    pizzaType,
    size,
  };
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullname: "John Doe",
        email: "john_doe@gmail.com",
        password: hashSync('123456', 10), 
        verified: new Date(),
        role: "USER",
      },
      {
        fullname: "Admin",
        email: "admin@gmail.com",
        password: hashSync('123456', 10),
        verified: new Date(),
        role: "ADMIN",
      }
    ],
  });

  await prisma.category.createMany({ data: categories });

  await prisma.ingredient.createMany({ data: ingredients });

  await prisma.product.createMany({ data: products });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Pepperoni fresco',
      imageUrl:
        '/assets/images/products/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Cheesy',
      imageUrl:
        '/assets/images/products/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Chorizo fresco',
      imageUrl:
        '/assets/images/products/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Pizza "Pepperoni fresco"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20, priceFrom: 5, priceTo: 8 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30, priceFrom: 5, priceTo: 8 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40, priceFrom: 8, priceTo: 10 }),

      // Pizza "Cheesy"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20, priceFrom: 4, priceTo: 6 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30, priceFrom: 7, priceTo: 9 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40, priceFrom: 10, priceTo: 12 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20, priceFrom: 9, priceTo: 10 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30, priceFrom: 11, priceTo: 12 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40, priceFrom: 13, priceTo: 14 }),

      // Pizza "Chorizo fresco"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20, priceFrom: 4, priceTo: 6 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30, priceFrom: 4, priceTo: 6 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40, priceFrom: 7, priceTo: 8 }),

      // Other products
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "12345"
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "56789"
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://images.unsplash.com/photo-1572552635104-daf938e0aa1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        previewImageUrl:
          'https://images.unsplash.com/photo-1536964549204-cce9eab227bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        previewImageUrl:
          'https://images.unsplash.com/photo-1558138838-909d7bfc5d4d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        previewImageUrl:
          'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        previewImageUrl:
          'https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        previewImageUrl:
          'https://images.unsplash.com/photo-1589187151053-5ec8818e661b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://images.unsplash.com/photo-1572552635104-daf938e0aa1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://images.unsplash.com/photo-1558138838-76294be30005?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://images.unsplash.com/photo-1537734796389-e1fc293cf856?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://images.unsplash.com/photo-1550401728-539ebf40d9e9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://images.unsplash.com/photo-1536964549204-cce9eab227bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })