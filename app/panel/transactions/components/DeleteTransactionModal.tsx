"use client";

import { Modal } from "@/components/Modal";
import { startTransition, useActionState, useEffect } from "react";
import { deleteTransactionAction } from "../actions/deleteTransaction.action";

type TProps = { id: number; open: boolean; onClose: () => void };

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export function DeleteTransactionModal({ id, open, onClose }: TProps) {
  const [state, action, isPending] = useActionState(
    deleteTransactionAction,
    initialState,
  );

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("id", String(id));

    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!isPending) {
          onClose();
        }
      }}
      title="حذف تراکنش"
    >
      <div className="space-y-5">
        <p className="text-sm leading-6 text-slate-600">
          آیا از حذف این تراکنش اطمینان دارید؟
        </p>

        {state.message && !state.success && (
          <p className="text-sm text-red-600">{state.message}</p>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => onClose()}
            disabled={isPending}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "در حال حذف..." : "حذف تراکنش"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
