"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUserFullNameAction() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "کاربر احراز هویت نشده است",
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  if (error) {
    return {
      success: false,
      error: "دریافت اطلاعات با خطا مواجه شد",
    };
  }

  return {
    success: true,
    data: data as { full_name: string },
  };
}
