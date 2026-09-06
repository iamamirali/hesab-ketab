import Link from "next/link";
import { DashboardSummary } from "./_components/DashboardSummary";
import { DashboardHeader } from "./_components/DashboardHeader";

const transactions = [
  {
    id: 1,
    title: "خرید مواد غذایی",
    category: "مواد غذایی",
    date: "امروز، ۱۰:۳۰",
    amount: "-۸۵۰,۰۰۰",
    type: "expense",
  },
  {
    id: 2,
    title: "دریافت حقوق",
    category: "حقوق",
    date: "امروز، ۰۹:۰۰",
    amount: "+۲۵,۰۰۰,۰۰۰",
    type: "income",
  },
  {
    id: 3,
    title: "قبض اینترنت",
    category: "قبوض",
    date: "دیروز، ۱۸:۴۵",
    amount: "-۳۲۰,۰۰۰",
    type: "expense",
  },
  {
    id: 4,
    title: "رستوران",
    category: "تفریح و رستوران",
    date: "دیروز، ۱۴:۲۰",
    amount: "-۷۵۰,۰۰۰",
    type: "expense",
  },
  {
    id: 5,
    title: "فروش وسیله شخصی",
    category: "سایر درآمدها",
    date: "۲ روز پیش",
    amount: "+۲,۵۰۰,۰۰۰",
    type: "income",
  },
];

const expenses = [
  {
    title: "مواد غذایی",
    amount: "۳,۲۰۰,۰۰۰",
    percentage: 42,
  },
  {
    title: "حمل و نقل",
    amount: "۱,۴۵۰,۰۰۰",
    percentage: 19,
  },
  {
    title: "تفریح و رستوران",
    amount: "۱,۲۰۰,۰۰۰",
    percentage: 16,
  },
  {
    title: "قبوض",
    amount: "۹۰۰,۰۰۰",
    percentage: 12,
  },
  {
    title: "سایر",
    amount: "۸۵۰,۰۰۰",
    percentage: 11,
  },
];

export default function PanelPage() {
  return (
    <div>
      <DashboardHeader />

      <main className="mx-auto px-5 mt-6 lg:mt-8 lg:px-8">
        <section>
          <DashboardSummary />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">هزینه‌ها</h2>

                <p className="mt-1 text-sm text-slate-400">بر اساس دسته‌بندی</p>
              </div>

              <Link
                href="/panel/transactions"
                className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
              >
                مشاهده همه
              </Link>
            </div>

            <div className="mt-7 space-y-5">
              {expenses.map((expense) => (
                <div key={expense.title}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      {expense.title}
                    </span>

                    <span className="text-xs font-semibold text-slate-700">
                      {expense.amount} تومان
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${expense.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div>
              <h2 className="font-bold text-slate-900">آخرین تراکنش‌ها</h2>

              <p className="mt-1 text-sm text-slate-400">
                آخرین درآمدها و هزینه‌های ثبت‌شده
              </p>
            </div>

            <Link
              href="/panel/transactions"
              className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
            >
              مشاهده همه
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-slate-50"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                      transaction.type === "income"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {transaction.type === "income" ? "↗" : "↘"}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {transaction.title}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`shrink-0 text-sm font-bold ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-slate-700"
                  }`}
                >
                  <bdi>{transaction.amount}</bdi> تومان
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
