"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/panel",
    label: "داشبورد",
  },
  {
    href: "/panel/transactions",
    label: "تراکنش‌ها",
  },
  {
    href: "/panel/categories",
    label: "دسته‌بندی‌ها",
  },
];

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-4 z-40 hidden w-72 rounded-2xl my-6 border border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <Link href="/panel" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white shadow-lg shadow-emerald-600/20">
            ح
          </div>

          <div>
            <p className="font-bold text-slate-900">حساب کتاب</p>

            <p className="mt-0.5 text-xs text-slate-400">مدیریت امور مالی</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/panel"
                ? pathname === "/panel"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <span className="absolute right-0 h-7 w-1 rounded-l-full bg-emerald-500" />
                )}

                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-lg text-lg transition ${
                    isActive
                      ? "bg-emerald-500"
                      : "bg-slate-200 group-hover:bg-slate-300 "
                  }`}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button
          type="button"
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-lg">
            ↪
          </span>
          خروج از حساب
        </button>
      </div>
    </aside>
  );
}
