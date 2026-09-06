"use server";

import { createClient } from "@/lib/supabase/server";
import { ITransaction } from "../transactions/types";

export async function getLatestTransactionsAction(): Promise<{
  success: boolean;
  message: string;
  data: ITransaction[];
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
      data: [],
    };
  }

  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      category:categories (
        id,
        name,
        type
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    return {
      success: false,
      message: "دریافت آخرین تراکنش‌ها انجام نشد.",
      data: [],
    };
  }

  return {
    success: true,
    message: "",
    data: data as ITransaction[],
  };
}
