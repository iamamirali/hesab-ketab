"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormValues, categorySchema } from "@/schemas/category.schema";
import { createCategoryAction } from "../actions/createCategory.action";
import { ECategoryType } from "../types";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export function CategoryForm({
  onSuccess,
  type,
}: {
  onSuccess?: () => void;
  type: ECategoryType;
}) {
  const [state, formAction, isPending] = useActionState(
    createCategoryAction,
    initialState,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      reset();
      onSuccess?.();
    }
  }, [state.success, reset, onSuccess]);

  const onSubmit = (data: CategoryFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("type", type);

    startTransition(() => formAction(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          نام دسته‌بندی
        </label>

        <input
          id="name"
          {...register("name")}
          placeholder="مثلاً مواد غذایی"
          disabled={isPending}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 disabled:bg-slate-50"
        />

        {errors.name && (
          <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {state.message && !state.success && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {state.message}
        </p>
      )}

      {state.success && (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "در حال ثبت..." : "ثبت"}
      </button>
    </form>
  );
}
