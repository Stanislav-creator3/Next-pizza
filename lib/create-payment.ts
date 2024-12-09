import { PaymentData } from "./../@types/yookasa";
import axios from "axios";

interface Props {
  description: string;
  amount: number;
  orderId: number;
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: process.env.YOOKASA_RETURN_URL as string,
      },
    },
    {
      auth: {
        username: process.env.YOOKASA_ID as string,
        password: process.env.YOOMONEY_API_KEY as string,
      },
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    }
  );

  return data;
}
