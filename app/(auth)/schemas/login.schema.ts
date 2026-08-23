import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("ایمیل واردشده معتبر نیست."),
  password: z.string().min(1, "رمز عبور الزامی است."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
