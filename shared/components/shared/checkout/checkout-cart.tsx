import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { CartStateItem } from "@/lib/get-cart-details";
import { CartItemSkeleton } from "../cart-item-skeleton";

interface Props {
  className?: string;
  items: CartStateItem[];
  loading?: boolean;
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  loading,
  onClickCountButton,
  removeCartItem,
}) => {
  return (
    <WhiteBlock title="1. Корзина">
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => <CartItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                details={getCartItemDetails(item.ingredients)}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
