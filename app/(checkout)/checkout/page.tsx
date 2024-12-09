"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSidebar, Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import {
  CheckoutAddress,
  CheckoutCart,
  CheckoutPersonal,
} from "@/shared/components";
import { checkoutFormSchema, TCheckoutFormValue } from "@/shared/constants";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const form = useForm<TCheckoutFormValue>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const onSubmit = async (data: TCheckoutFormValue) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.error("Заказ успешно оформлен! 🧾 Переход на оплату...", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      toast.error("Произошла ошибка при оформлении заказа", {
        icon: "❌",
      });
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[32px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />
              <CheckoutPersonal
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <CheckoutAddress
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar
                loading={loading || submitting}
                totalAmount={totalAmount}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
