"use client";

import { signOutAction } from "@/app/(auth)/actions/signout.action";
import {
  ArrowLeftRight,
  LayoutDashboard,
  LogOutIcon,
  PlusIcon,
  Tags,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Modal } from "./Modal";
import { TransactionForm } from "@/app/panel/transactions/components/TransactionForm";
import { useState } from "react";

const navigationItems = [
  {
    href: "/panel",
    label: "داشبورد",
    icon: LayoutDashboard,
  },
  {
    href: "/panel/transactions",
    label: "تراکنش‌ها",
    icon: ArrowLeftRight,
  },
  {
    href: "/panel/categories",
    label: "دسته‌بندی‌ها",
    icon: Tags,
  },
];

export default function SideMenu() {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 right-4 z-40 hidden w-72 rounded-2xl my-6 border border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="flex h-20 items-center border-b border-slate-100 px-6 gap-1">
          <Image src="/logo.svg" width={60} height={60} alt="logo" />

          <div>
            <p className="font-bold text-slate-900">حساب کتاب</p>
            <p className="mt-0.5 text-xs text-slate-400">مدیریت امور مالی</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/panel"
                  ? pathname === "/panel"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <span className="absolute right-0 h-7 w-1 rounded-l-full bg-emerald-500" />
                  )}

                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                      isActive ? "bg-emerald-50" : "bg-transparent"
                    }`}
                  >
                    <Icon size={21} strokeWidth={isActive ? 2.5 : 2} />
                  </span>

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpenTransactionModal(true)}
            className="mt-8 w-full h-25 justify-center flex cursor-pointer items-center gap-2 rounded-2xl border-dashed border-2 border-emerald-600 px-4 text-emerald-600 hover:border-emerald-800 hover:text-emerald-800 shadow-sm transition active:scale-[0.98]"
          >
            <span className="flex shrink-0 items-center justify-center rounded-xl">
              <PlusIcon size={28} strokeWidth={2.5} />
            </span>
            <span className="block font-bold">ثبت تراکنش جدید</span>
          </button>
        </nav>

        <div className="border-t border-slate-200 p-4">
          <button
            type="button"
            className="mt-1 cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
            onClick={signOutAction}
          >
            <LogOutIcon size={20} />
            خروج از حساب
          </button>
        </div>
      </aside>

      <Modal
        open={openTransactionModal}
        onClose={() => setOpenTransactionModal(false)}
        title="ثبت تراکنش جدید"
      >
        <TransactionForm onSuccess={() => setOpenTransactionModal(false)} />
      </Modal>
    </>
  );
}
