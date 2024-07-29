import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Calc total pizza price
 * 
 * @example ```calcTotalPizzaPrice('Traditional', 20, items, ingredients, selectedIngredients)```
 * 
 * @param {PizzaType} type 
 * @param {PizzaSize} size 
 * @param {ProductItem[]} items 
 * @param {Ingredient[]} ingredients 
 * @param {Set<number>} selectedIngredients 
 * @returns {number}
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
): number => {
  const pizzaPrice =
    items.find((item) => item.size === size && item.pizzaType === type)
      ?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};