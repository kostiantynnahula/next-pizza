"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

type Props = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  const firstItem = product?.items[0];
  const isPizzaForm = Boolean(firstItem?.pizzaType);

  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({ productItemId: itemId, ingredients, quantity: 1 });

      toast.success(`${product.name} added to cart`);
      router.back();
    } catch (e) {
      toast.error(`
        ${product.name} was not added to cart. 
        Please try again later.
      `);
      console.error(e);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            loading={loading}
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
          />
        ) : (
          <ChooseProductForm
            loading={loading}
            price={firstItem.price}
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={() => onSubmit()}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
