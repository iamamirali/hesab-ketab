"use client";

import {
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { ECategoryType, ICategory } from "../types";
import { Modal } from "@/components/Modal";
import { CategoryForm } from "./CategoryForm";
import { useState } from "react";
import { DeleteCategoryModal } from "./DeleteCategoryModal";

type TProps = ICategory;

export function CategoryCard(props: TProps) {
  const { id, name, type } = props ?? {};
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const isIncome = type === ECategoryType.Income;

  return (
    <>
      <div className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 lg:p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50">
        <div className="flex min-w-0 items-center gap-3">
          {isIncome ? (
            <BanknoteArrowDownIcon className="shrink-0 text-emerald-500" />
          ) : (
            <BanknoteArrowUpIcon className="shrink-0 text-red-600" />
          )}

          <h3 className="truncate font-bold text-slate-800 text-sm lg:text-base">
            {name}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-1 lg:gap-2">
          <button
            type="button"
            aria-label="ویرایش دسته‌بندی"
            className="rounded-lg p-2 cursor-pointer text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={() => setOpenEditModal(true)}
          >
            <PencilIcon className="size-4 lg:size-5" />
          </button>

          <button
            type="button"
            aria-label="حذف دسته‌بندی"
            className="rounded-lg p-2 cursor-pointer text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            onClick={() => setOpenDeleteModal(true)}
          >
            <Trash2Icon className="size-4 lg:size-5" />
          </button>
        </div>
      </div>

      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title={`ویرایش دسته‌بندی ${isIncome ? "درآمد" : "هزینه"}`}
      >
        <CategoryForm
          {...{ type, id, name }}
          onSuccess={() => setOpenEditModal(false)}
        />
      </Modal>

      <DeleteCategoryModal
        {...{ id, name }}
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}
