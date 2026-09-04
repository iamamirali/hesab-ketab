import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "نام دسته‌بندی الزامی است")
    .max(50, "نام دسته‌بندی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
