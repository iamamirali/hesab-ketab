"use server";

import { createClient } from "@/lib/supabase/server";
import { SignupFormValues, signupSchema } from "../schemas/signup.schema";
import { redirect } from "next/navigation";

export type SignupActionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Partial<Record<keyof SignupFormValues, string[]>>;
    };

export async function signupAction(
  values: SignupFormValues,
): Promise<SignupActionResult> {
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

  const { error } = await supabase.auth.signUp({
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

  redirect("/");
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
