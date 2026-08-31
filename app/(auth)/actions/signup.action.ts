"use server";

import { createClient } from "@/lib/supabase/server";
import { SignupFormValues, signupSchema } from "../schemas/signup.schema";
import { SignupActionState } from "../types/auth-action.types";
import { redirect } from "next/navigation";

export async function signupAction(
  _previousState: SignupActionState,
  formData: FormData,
): Promise<SignupActionState> {
  const values: SignupFormValues = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };

  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "اطلاعات واردشده معتبر نیست.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { fullName, email, password } = parsed.data;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: getSignupErrorMessage(error.message),
    };
  }

  if (!data.user) {
    return {
      success: false,
      message: "ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید.",
    };
  }

  redirect("/panel");
}

function getSignupErrorMessage(message: string) {
  if (message.includes("already registered")) {
    return "این ایمیل قبلاً ثبت‌نام کرده است.";
  }

  if (message.includes("Password")) {
    return "رمز عبور واردشده معتبر نیست.";
  }

  if (message.includes("email")) {
    return "ایمیل واردشده معتبر نیست.";
  }

  return "ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید.";
}
