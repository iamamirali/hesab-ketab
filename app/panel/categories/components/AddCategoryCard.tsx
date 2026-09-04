"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { CategoryForm } from "./CategoryForm";
import { PlusIcon } from "lucide-react";
import { ECategoryType } from "../types";

export function AddCategoryCard({ type }: { type: ECategoryType }) {
  const isIncome = type === ECategoryType.Income;
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-white py-3 px-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl font-medium text-slate-400">
          <PlusIcon />
        </div>

        <p className="text-base font-semibold text-slate-700">
          افزودن دسته‌بندی {isIncome ? "درآمد" : "هزینه"}
        </p>
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`افزودن دسته‌بندی ${isIncome ? "درآمد" : "هزینه"}`}
      >
        <CategoryForm type={type} onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
