"use client";

import { startTransition, useActionState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormValues } from "../schemas/signup.schema";
import { signupAction } from "../actions/signup.action";
import { SignupActionState } from "../types/auth-action.types";

const initialState: SignupActionState = {
  success: false,
  message: "",
};

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (state.fieldErrors) {
      Object.entries(state.fieldErrors).forEach(([field, messages]) => {
        if (messages?.[0]) {
          setError(field as keyof SignupFormValues, {
            type: "server",
            message: messages[0],
          });
        }
      });
    }
  }, [state.fieldErrors, setError]);

  // useEffect(() => {
  //   if (state.success && state.message) {
  //     if (state.message.includes("ایمیل")) {
  //       return;
  //     }

  //     router.push("/dashboard");
  //     router.refresh();
  //   }
  // }, [state.success, state.message, router]);

  const onSubmit = (values: SignupFormValues) => {
    clearErrors();

    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="w-full">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900">ایجاد حساب کاربری</h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          برای شروع مدیریت درآمدها و هزینه‌های خود ثبت‌نام کنید.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            نام و نام خانوادگی
          </label>

          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder=""
            disabled={isPending}
            {...register("fullName")}
            className={inputClass(!!errors.fullName)}
          />

          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            ایمیل
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder="example@email.com"
            disabled={isPending}
            {...register("email")}
            className={`${inputClass(!!errors.email)} text-left`}
          />

          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            رمز عبور
          </label>

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            dir="ltr"
            placeholder="حداقل ۶ کاراکتر"
            disabled={isPending}
            {...register("password")}
            className={`${inputClass(!!errors.password)} text-left`}
          />

          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            تکرار رمز عبور
          </label>

          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            dir="ltr"
            placeholder="رمز عبور را دوباره وارد کنید"
            disabled={isPending}
            {...register("confirmPassword")}
            className={`${inputClass(!!errors.confirmPassword)} text-left`}
          />

          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {!state.success && state.message && (
          <div
            role="alert"
            className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            {state.message}
          </div>
        )}

        {state.success && state.message && (
          <div
            role="status"
            className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700"
          >
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "در حال ایجاد حساب..." : "ایجاد حساب"}
        </button>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
        قبلاً حساب دارید؟{" "}
        <Link
          href="/login"
          className="font-semibold text-emerald-600 hover:text-emerald-700"
        >
          وارد شوید
        </Link>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `
    h-12 w-full rounded-xl border
    bg-slate-50 px-4 text-sm
    outline-none transition
    placeholder:text-slate-400
    focus:bg-white
    focus:ring-4
    disabled:cursor-not-allowed
    disabled:opacity-60
    ${
      hasError
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10"
    }
  `;
}
