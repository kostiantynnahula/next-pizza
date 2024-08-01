import { Container, GroupVariants, Title } from "@/shared/components/shared";
import { PizzaImage } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={40} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">Lorem ipsum dolor sit amet.</p>
          <GroupVariants
            value="2"
            items={[
              { name: "Small", value: "1", disabled: false },
              { name: "Medium", value: "2", disabled: false },
              { name: "Large", value: "3", disabled: false },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
