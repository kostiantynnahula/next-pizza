import React, { useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { Ingredient } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductWithRelations["items"];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAddCart,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngedient }] = useSet(
    new Set<number>([])
  );

  const pizzaPrice =
    items.find((item) => item.size === size && item.pizzaType === type)
      ?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const textDetails = `${size} sm, ${mapPizzaType[type]} type pizza`;

  const handleClickAdd = () => {
    onClickAddCart?.();
  };

  const availablePizzas = items.filter((item) => item.pizzaType === type);

  const availablePizzaSizes = pizzaSizes.map((item) => ({
    ...item,
    disabled: !availablePizzas.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    );

    const availableSize = availablePizzaSizes.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-10">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngedient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5"
          onClick={handleClickAdd}
        >
          Add to card for {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
