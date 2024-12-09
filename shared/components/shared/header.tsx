"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { AuthModal, ProfileButton, SearchInput } from ".";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  hasSearch?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Заказ оплачен! Информация о заказе отправлена на почту";
    }
    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn(" border-gray-100", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href={"/"}>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSingIn={() => setOpenAuthModal(true)} />
        </div>
      </Container>
    </header>
  );
};
