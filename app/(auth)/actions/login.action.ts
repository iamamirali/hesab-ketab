"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import type { LoginActionState } from "../types/auth-action.types";
import { redirect } from "next/navigation";

export async function loginAction(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const values: LoginFormValues = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "اطلاعات واردشده معتبر نیست.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: getLoginErrorMessage(error.message),
    };
  }

  redirect("/panel");
}

function getLoginErrorMessage(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "ایمیل یا رمز عبور اشتباه است.";
  }

  if (message.includes("Email not confirmed")) {
    return "ایمیل شما هنوز تأیید نشده است.";
  }

  return "ورود انجام نشد. لطفاً دوباره تلاش کنید.";
}
