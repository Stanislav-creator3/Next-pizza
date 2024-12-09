"use client"

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { CardButton, Categories, Container, SortPopup } from "@/shared/components/shared";
import { Category } from "@prisma/client";
import { useSticky } from "@/shared/hooks/use-sticky";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({categories, className }) => {
 
  const {isSticky, ref} = useSticky<HTMLDivElement>()


  return (
    <div
    ref={ref}
      className={cn(
        "sticky top-[-1px] py-5 shadow-lg shadow-black/5 z-10 transition-all duration-500",
        isSticky ? "bg-white/80 backdrop-blur-[20px] " : "",
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories items={categories}/>
        <div className="flex items-center gap-3">
        <SortPopup />
        <CardButton className="h-[52px]"/>
        </div>
      
      </Container>
    </div>
  );
};
