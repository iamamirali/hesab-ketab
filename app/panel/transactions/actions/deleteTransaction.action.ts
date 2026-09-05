"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteTransactionAction(
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

  const transactionId = formData.get("id");

  if (typeof transactionId !== "string" || !transactionId) {
    return {
      success: false,
      message: "شناسه تراکنش نامعتبر است.",
      errors: {},
    };
  }

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: "حذف تراکنش انجام نشد.",
      errors: {},
    };
  }

  revalidatePath("/panel");

  return {
    success: true,
    message: "تراکنش با موفقیت حذف شد.",
    errors: {},
  };
}
