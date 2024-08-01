"use client";

import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import { ChoosePizzaForm } from "@/shared/components/shared/choose-pizza-form";
import { ChooseProductForm } from "@/shared/components/shared";
import toast from "react-hot-toast";

type Props = {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
  className?: string;
};

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const firstItem = product?.items[0];
  const isPizzaForm = Boolean(firstItem?.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({ productItemId: itemId, ingredients, quantity: 1 });

      toast.success(`${product.name} added to cart`);
      _onSubmit?.();
    } catch (e) {
      toast.error(`
        ${product.name} was not added to cart. 
        Please try again later.
      `);
      console.error(e);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        loading={loading}
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <ChooseProductForm
      loading={loading}
      price={firstItem.price}
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={() => onSubmit()}
    />
  );
};
