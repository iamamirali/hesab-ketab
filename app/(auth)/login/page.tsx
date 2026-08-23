"use client";

import { startTransition, useActionState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { loginAction } from "../actions/login.action";
import type { LoginActionState } from "../types/auth-action.types";

const initialState: LoginActionState = {
  success: false,
  message: "",
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.fieldErrors) {
      Object.entries(state.fieldErrors).forEach(([field, messages]) => {
        if (messages?.[0]) {
          setError(field as keyof LoginFormValues, {
            type: "server",
            message: messages[0],
          });
        }
      });
    }

    // if (state.success) {
    //   router.push("/dashboard");
    //   router.refresh();
    // }
  }, [state, setError]);

  const onSubmit = (values: LoginFormValues) => {
    clearErrors();

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="w-full">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900">
          ورود به حساب کاربری
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          برای مدیریت امور مالی خود وارد حساب کاربری شوید.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
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
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              رمز عبور
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-medium text-emerald-600 transition hover:text-emerald-700"
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            dir="ltr"
            placeholder="رمز عبور خود را وارد کنید"
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

        {!state.success && state.message && (
          <div
            role="alert"
            className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            {state.message}
          </div>
        )}

        {state.success && (
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
          {isPending ? "در حال ورود..." : "ورود به حساب"}
        </button>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
        حساب کاربری ندارید؟{" "}
        <Link
          href="/signup"
          className="font-semibold text-emerald-600 transition hover:text-emerald-700"
        >
          ثبت‌نام کنید
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
