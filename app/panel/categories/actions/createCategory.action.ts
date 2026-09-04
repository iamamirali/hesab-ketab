"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(
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

  const data = {
    name: formData.get("name"),
    type: formData.get("type"),
  };

  const { error } = await supabase.from("categories").insert({
    name: data.name,
    type: data.type,
    user_id: user.id,
  });

  if (error) {
    return {
      success: false,
      message: "افزودن دسته‌بندی انجام نشد.",
      errors: {},
    };
  }

  revalidatePath("/panel");

  return {
    success: true,
    message: "دسته‌بندی با موفقیت اضافه شد.",
    errors: {},
  };
}
