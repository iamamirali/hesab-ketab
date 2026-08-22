import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد.")
      .max(100, "نام و نام خانوادگی بیش از حد طولانی است."),

    email: z.string().trim().email("ایمیل واردشده معتبر نیست."),

    password: z
      .string()
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد.")
      .max(72, "رمز عبور بیش از حد طولانی است."),

    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند.",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
