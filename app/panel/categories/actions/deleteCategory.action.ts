"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteCategoryAction(
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

  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return {
      success: false,
      message: "شناسه دسته‌بندی نامعتبر است.",
      errors: {},
    };
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: "حذف دسته‌بندی انجام نشد.",
      errors: {},
    };
  }

  revalidatePath("/panel");

  return {
    success: true,
    message: "دسته‌بندی با موفقیت حذف شد.",
    errors: {},
  };
}
