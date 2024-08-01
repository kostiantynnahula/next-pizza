import { useEffect, useState } from 'react';
import { useSet } from "react-use";
import { PizzaType, PizzaSize } from "../constants/pizza";
import { Variant } from '../components/shared/group-variants';
import { ProductItem } from '@prisma/client';
import { getAvailablePizzaSizes } from '../lib';

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  currentItemId?: number;
  availableSizes: Variant[];
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngedient: (id: number) => void;
}

export const usePizzaOptions = (
  items: ProductItem[],
): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngedient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = getAvailablePizzaSizes(type, items);

  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  useEffect(() => {
    const isAvailableSize = availableSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    );

    const availableSize = availableSizes.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {size, type, selectedIngredients, currentItemId, availableSizes, setSize, setType, addIngedient};
};