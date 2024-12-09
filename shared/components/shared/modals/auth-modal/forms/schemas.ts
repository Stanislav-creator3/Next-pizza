import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, { message: "Пароль должен содержать не менее 6 символов" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Некорректный e-mail" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: "Введите имя и фамилию" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });


export type TFormLoginValue = z.infer<typeof formLoginSchema>;
export type TFormRegisterValue = z.infer<typeof formRegisterSchema>;