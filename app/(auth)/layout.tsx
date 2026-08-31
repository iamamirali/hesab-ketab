import Image from "next/image";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
        <div className="w-full">
          <div className="mb-8 text-center">
            <Image
              src="/logo.svg"
              width={80}
              height={80}
              alt="logo"
              className="m-auto"
            />

            <h1 className="text-2xl font-bold text-slate-900">حساب کتاب</h1>

            <p className="mt-2 text-sm text-slate-500">
              مدیریت ساده و هوشمند امور مالی
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            {children}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            اطلاعات مالی شما با امنیت و حریم خصوصی محافظت می‌شود.
          </p>
        </div>
      </div>
    </main>
  );
}
