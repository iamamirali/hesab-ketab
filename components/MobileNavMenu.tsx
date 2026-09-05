"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRightIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PlusIcon,
  TagsIcon,
} from "lucide-react";
import { signOutAction } from "@/app/(auth)/actions/signout.action";
import { Modal } from "./Modal";
import { TransactionForm } from "@/app/panel/transactions/components/TransactionForm";
import { useState } from "react";

const navigationItems = [
  {
    href: "/panel",
    label: "داشبورد",
    icon: LayoutDashboardIcon,
  },
  {
    href: "/panel/transactions",
    label: "تراکنش‌ها",
    icon: ArrowLeftRightIcon,
  },
  {
    href: "/panel/categories",
    label: "دسته‌بندی‌ها",
    icon: TagsIcon,
  },
];

export function MobileNavMenu() {
  const pathname = usePathname();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const rightItems = navigationItems.slice(0, 2);
  const leftItems = [
    navigationItems[2],
    {
      href: "#",
      label: "خروج از حساب",
      icon: LogOutIcon,
      logout: true,
    },
  ];

  const renderItem = (item: (typeof navigationItems)[number]) => {
    const Icon = item.icon;

    const isActive =
      item.href === "/panel"
        ? pathname === "/panel"
        : pathname === item.href || pathname.startsWith(`${item.href}/`);

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`relative flex h-full min-w-[64px] flex-1 flex-col items-center justify-center gap-0.5 transition ${
          isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
        }`}
      >
        <span
          className={`flex h-9 w-10 items-center justify-center rounded-xl transition ${
            isActive ? "bg-emerald-50" : "bg-transparent"
          }`}
        >
          <Icon size={21} strokeWidth={isActive ? 2.5 : 2} />
        </span>

        <span
          className={`text-[10px] font-medium ${
            isActive ? "font-semibold text-emerald-600" : "text-slate-400"
          }`}
        >
          {item.label}
        </span>

        {isActive && (
          <span className="absolute bottom-[-5] h-0.5 w-8 rounded-full bg-emerald-500" />
        )}
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur lg:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center">
          <div className="flex flex-1">{rightItems.map(renderItem)}</div>

          <div className="relative flex h-full w-20 shrink-0 items-center justify-center">
            <button
              type="button"
              aria-label="ثبت تراکنش جدید"
              className="absolute bottom-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-white transition hover:bg-emerald-700 active:scale-95"
              onClick={() => setOpenTransactionModal(true)}
            >
              <PlusIcon size={28} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex flex-1">
            {leftItems.map((item) => {
              const Icon = item.icon;

              if ("logout" in item && item.logout) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="flex h-full min-w-16 flex-1 flex-col items-center justify-center gap-0.5 text-slate-400 transition"
                    onClick={signOutAction}
                  >
                    <span className="flex h-9 w-10 items-center justify-center rounded-xl">
                      <Icon size={21} className="text-red-400" />
                    </span>

                    <span className="text-[10px] font-medium text-red-400">
                      {item.label}
                    </span>
                  </button>
                );
              }

              return renderItem(item);
            })}
          </div>
        </div>
      </nav>

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
