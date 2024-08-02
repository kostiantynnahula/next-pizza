import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  type?: PizzaType | null,
  size?: PizzaSize | null,
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