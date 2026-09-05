"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ECategoryType, ICategory } from "../../categories/types";
import { updateTransactionAction } from "../actions/updateTransaction.action";
import { createTransactionAction } from "../actions/createTransaction.action";
import {
  TransactionFormValues,
  transactionSchema,
} from "@/schemas/transaction.schema";
import { getCategoriesAction } from "../../categories/actions/categories.action";
import { ToggleButton } from "@/components/ToggleButton";
import { RHFSelect } from "@/components/RHFSelect";
import { RHFDatePicker } from "@/components/RHFDatePicker";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

type TProps = {
  onSuccess?: () => void;
  category?: ICategory;
  amount?: number;
  description?: string | null;
  id?: number;
  created_at?: Date;
};

export function TransactionForm({
  onSuccess,
  category,
  amount,
  description,
  id,
  created_at,
}: TProps) {
  const isEdit = !!id;
  const [transactionType, setTransactionType] = useState(
    category?.type ?? ECategoryType.Expense,
  );
  const [state, formAction, isPending] = useActionState(
    isEdit ? updateTransactionAction : createTransactionAction,
    initialState,
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      category: category?.id ? { id: category.id, label: category.name } : null,
      amount: amount ?? undefined,
      description: description ?? "",
      ...(created_at ? { createdAt: new Date(created_at) } : {}),
    },
  });

  useEffect(() => {
    if (state.success) {
      reset();
      onSuccess?.();
    }
  }, [state.success, reset, onSuccess]);

  const getCategoryOptions = () =>
    getCategoriesAction(transactionType).then(
      (res) => res?.map((item) => ({ label: item.name, id: item.id })) ?? [],
    );

  const onSubmit = (data: TransactionFormValues) => {
    const formData = new FormData();

    if (id) {
      formData.append("id", String(id));
    }

    formData.append("category_id", String(data.category?.id));
    formData.append("amount", String(data.amount));
    formData.append("description", data.description ?? "");
    formData.append("created_at", data.createdAt.toISOString() ?? "");

    startTransition(() => {
      formAction(formData);
    });
  };

  const onTransactionTypeChange = (value: ECategoryType) => {
    setTransactionType(value);
    setValue("category", null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <ToggleButton
        value={transactionType}
        onChange={onTransactionTypeChange}
        disabled={isPending}
        options={[
          { label: "هزینه", value: ECategoryType.Expense },
          { label: "درآمد", value: ECategoryType.Income },
        ]}
        selectedButtonClassName={`${transactionType === ECategoryType.Income ? "text-emerald-800 bg-emerald-100" : "text-red-800 bg-red-100"}`}
        className="sm:w-60! h-12 sm:h-auto border-slate-200 border"
      />

      <div>
        <label
          htmlFor="category_id"
          className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700"
        >
          دسته‌بندی
        </label>

        <RHFSelect<TransactionFormValues, string>
          name="category"
          control={control}
          disabled={isPending}
          getOptionsAction={getCategoryOptions}
        />
      </div>

      <div>
        <label
          htmlFor="category_id"
          className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700"
        >
          تاریخ تراکنش
        </label>

        <RHFDatePicker
          name="createdAt"
          control={control}
          disabled={isPending}
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          مبلغ
        </label>

        <input
          id="amount"
          type="number"
          dir="ltr"
          {...register("amount", {
            valueAsNumber: true,
          })}
          placeholder="مثلاً 500000"
          disabled={isPending}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 disabled:bg-slate-50"
        />

        {errors.amount && (
          <p className="mt-1.5 text-xs text-red-500">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          توضیحات
        </label>

        <textarea
          id="description"
          {...register("description")}
          placeholder="توضیحات تراکنش"
          disabled={isPending}
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 disabled:bg-slate-50"
        />

        {errors.description && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.description.message}
          </p>
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
        {isPending ? "در حال ثبت..." : isEdit ? "ذخیره تغییرات" : "ثبت تراکنش"}
      </button>
    </form>
  );
}
