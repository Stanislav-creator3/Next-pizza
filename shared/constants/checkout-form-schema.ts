import { Check } from 'lucide-react';
import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(3, "Имя должно содержать не менее 3 символов")
    .max(20, "Имя должно содержать не более 20 символов"),
  lastName: z
    .string()
    .min(3, "Фамилия должна содержать не менее 3 символов")
    .max(20, "Фамилия должна содержать не более 20 символов"),
  email: z.string().email("Некорректный e-mail"),
  address: z.string().min(3, "Адрес должен содержать не менее 3 символов"),
  phone: z.string().min(11, "Телефон должен содержать не менее 11 символов"),
  comment: z.string().optional(),
});

export type TCheckoutFormValue = z.infer<typeof checkoutFormSchema>;