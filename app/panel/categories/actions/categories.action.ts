"use server";

import { createClient } from "@/lib/supabase/server";
import { ECategoryType, ICategory } from "../types";

export async function getCategoriesAction(type: ECategoryType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.id)
    .eq("type", type);

  if (error) {
    throw new Error(error.message);
  }

  return data as ICategory[];
}
