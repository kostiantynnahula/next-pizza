import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

export const getCartItemDetails = (
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredient[],
): string => {
  const details = [];

  if (size && type) {
    const typeName = mapPizzaType[type];
    details.push(`${typeName} ${size} sm`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
}