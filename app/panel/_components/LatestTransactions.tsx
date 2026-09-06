import { BanknoteArrowDownIcon, BanknoteArrowUpIcon } from "lucide-react";
import { getLatestTransactionsAction } from "../_actions/getLatestTransactions.action";
import { ECategoryType } from "../categories/types";

export async function LatestTransactions() {
  const { data } = await getLatestTransactionsAction();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div>
          <h2 className="font-bold text-slate-900">آخرین تراکنش‌ها</h2>

          <p className="mt-1 text-sm text-slate-400">
            آخرین درآمدها و هزینه‌های ثبت‌شده
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {data?.map((transaction) => (
          <div
            key={transaction.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap:1 sm:gap-4 p-6 transition hover:bg-slate-50"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                  transaction.category.type === ECategoryType.Income
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {transaction.category.type === ECategoryType.Income ? (
                  <BanknoteArrowDownIcon />
                ) : (
                  <BanknoteArrowUpIcon />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {transaction.category.name}
                </p>

                <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                  <span>
                    {new Intl.DateTimeFormat("fa-IR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(transaction.created_at))}
                  </span>
                  {transaction.description && (
                    <span> • {transaction.description}</span>
                  )}
                </div>
              </div>
            </div>

            <span
              className={`shrink-0 text-sm  font-bold text-slate-800 text-left sm:text-right`}
            >
              <bdi>
                {new Intl.NumberFormat("fa-IR").format(transaction.amount)}
              </bdi>{" "}
              تومان
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
