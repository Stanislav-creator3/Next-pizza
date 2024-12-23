"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="da8253971023766b98f26f4e9dba887c868abe73"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
