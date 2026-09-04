"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateCategoryAction(
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
  const name = formData.get("name");
  const type = formData.get("type");

  if (!id || !name || !type) {
    return {
      success: false,
      message: "اطلاعات وارد شده نامعتبر است.",
      errors: {},
    };
  }

  const { error } = await supabase
    .from("categories")
    .update({
      name,
      type,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: "ویرایش دسته‌بندی انجام نشد.",
      errors: {},
    };
  }

  revalidatePath("/panel");

  return {
    success: true,
    message: "دسته‌بندی با موفقیت ویرایش شد.",
    errors: {},
  };
}
