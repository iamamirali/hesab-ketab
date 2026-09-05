"use client";

import {
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { ITransaction } from "../types";
import { ECategoryType } from "../../categories/types";
import { TransactionForm } from "./TransactionForm";

type TProps = ITransaction;

export function TransactionCard(props: TProps) {
  const { id, amount, created_at, description, category } = props;

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const isIncome = category?.type === ECategoryType.Income;

  const formattedAmount = new Intl.NumberFormat("fa-IR").format(amount);

  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(created_at));

  return (
    <>
      <div className="group lg:max-h-22.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50 lg:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
              isIncome ? "bg-emerald-50" : "bg-red-50"
            }`}
          >
            {isIncome ? (
              <BanknoteArrowDownIcon className="size-5 text-emerald-500" />
            ) : (
              <BanknoteArrowUpIcon className="size-5 text-red-600" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-800 lg:text-base">
              {category.name}
            </h3>

            <p className="mt-1 text-xs text-slate-400 lg:text-sm">
              {formattedDate} {description ? ` • ${description}` : ""}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-1 lg:gap-4">
          <div
            className={`text-left text-sm font-bold lg:text-base ${
              isIncome ? "text-emerald-600" : "text-red-600"
            }`}
          >
            <span dir="ltr">
              {isIncome ? "+" : "-"} {formattedAmount}
            </span>

            <span className="mr-1 text-xs font-normal text-slate-400">
              تومان
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="ویرایش تراکنش"
              className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={() => setOpenEditModal(true)}
            >
              <PencilIcon className="size-4 lg:size-5" />
            </button>

            <button
              type="button"
              aria-label="حذف تراکنش"
              className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              onClick={() => setOpenDeleteModal(true)}
            >
              <Trash2Icon className="size-4 lg:size-5" />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="ویرایش تراکنش"
      >
        <TransactionForm
          {...{ amount, category, id, description, created_at }}
          onSuccess={() => setOpenEditModal(false)}
        />
      </Modal>

      {/* <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="حذف تراکنش"
      ></Modal> */}
    </>
  );
}
