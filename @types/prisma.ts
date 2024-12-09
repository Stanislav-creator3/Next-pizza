import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWitchRelations = Product & {
  items: ProductItem[];
  ingredients: Ingredient[];
};
