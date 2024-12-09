import { Variant } from '@/shared/components/shared/group-variants';
import { PizzaType, pizzaSizes } from '@/shared/constants/pizza';
import { ProductItem } from '@prisma/client';

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]) : Variant[] => {
  
    const availablePizza = items.filter((item) => item.pizzaType === type);

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !availablePizza.some(
          (pizza) => Number(pizza.size) === Number(item.value)
        ),
      }));
};