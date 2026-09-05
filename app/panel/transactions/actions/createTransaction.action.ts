"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTransactionAction(
  _prevState: {
    success: boolean;
    message: string;
    errors: Record<string, string[]>;
  },
  formData: FormData,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
      errors: {},
    };
  }

  const categoryId = formData.get("category_id");
  const amount = formData.get("amount");
  const description = formData.get("description");
  const createdAt = formData.get("created_at");

  if (
    typeof categoryId !== "string" ||
    typeof amount !== "string" ||
    !categoryId ||
    !amount
  ) {
    return {
      success: false,
      message: "اطلاعات وارد شده نامعتبر است.",
      errors: {},
    };
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    category_id: categoryId,
    amount: Number(amount),
    created_at: createdAt,
    description:
      typeof description === "string" && description.trim()
        ? description.trim()
        : null,
  });

  if (error) {
    return {
      success: false,
      message: "ثبت تراکنش انجام نشد.",
      errors: {},
    };
  }

  revalidatePath("/panel");

  return {
    success: true,
    message: "تراکنش با موفقیت ثبت شد.",
    errors: {},
  };
}
