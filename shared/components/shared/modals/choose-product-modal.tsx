"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ProductWitchRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { ChooseProductForm } from "../choose-product-form";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWitchRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
 

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <ProductForm product={product} onSubmit={() => router.back()}/>
      </DialogContent>
    </Dialog>
  );
};
