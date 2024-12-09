import { PizzaSize, PizzaType, mapPizzaType } from '@/shared/constants/pizza';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { Ingredient, ProductItem } from '@prisma/client';

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
  const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`;

  return { totalPrice, textDetaills };
};