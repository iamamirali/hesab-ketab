"use server";

import { createClient } from "@/lib/supabase/server";
import { IDashboardSummary } from "../types";

export async function getDashboardSummaryAction() {
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

  const { data, error } = await supabase.rpc("get_dashboard_summary");

  if (error) {
    return {
      success: false,
      error: "دریافت اطلاعات با خطا مواجه شد",
    };
  }

  return {
    success: true,
    data: data as IDashboardSummary,
  };
}
