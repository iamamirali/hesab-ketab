import { z } from "zod";

export const transactionSchema = z.object({
  category: z
    .object(
      {
        id: z.string().or(z.number()),
        label: z.string(),
      },
      { message: "لطفاً یک دسته‌بندی انتخاب کنید." },
    )
    .nullable()
    .refine(Boolean, { message: "لطفاً یک دسته‌بندی انتخاب کنید." }),
  amount: z
    .number({ error: "لطفا مبلغ را وارد کنید" })
    .positive("مبلغ باید بیشتر از صفر باشد."),
  createdAt: z.date({ error: "لطفا تاریخ را وارد کنید" }),
  description: z
    .string()
    .max(500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.")
    .optional()
    .or(z.literal("")),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
