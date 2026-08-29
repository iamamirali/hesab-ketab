import Link from "next/link";

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

const chartData = [
  { month: "فروردین", income: 72, expense: 45 },
  { month: "اردیبهشت", income: 60, expense: 52 },
  { month: "خرداد", income: 85, expense: 48 },
  { month: "تیر", income: 70, expense: 58 },
  { month: "مرداد", income: 92, expense: 55 },
  { month: "شهریور", income: 78, expense: 42 },
];

export default function PanelPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <h1 className="mt-1 text-xl font-bold text-slate-900">
            سلام امیرعلی 👋
          </h1>

          <Link
            href="/panel/transactions/new"
            className="flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            <span className="text-lg">+</span>
            ثبت تراکنش
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <section className="grid gap-5 md:grid-cols-3">
          <SummaryCard
            title="موجودی کل"
            value="۴۲,۳۵۰,۰۰۰"
            suffix="تومان"
            icon="◈"
            description="موجودی فعلی حساب‌ها"
          />

          <SummaryCard
            title="درآمد این ماه"
            value="۲۷,۵۰۰,۰۰۰"
            suffix="تومان"
            icon="↗"
            description="۱۲٪ بیشتر از ماه قبل"
            positive
          />

          <SummaryCard
            title="هزینه این ماه"
            value="۸,۴۲۰,۰۰۰"
            suffix="تومان"
            icon="↘"
            description="۸٪ کمتر از ماه قبل"
            positive
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">وضعیت مالی</h2>

                <p className="mt-1 text-sm text-slate-400">
                  مقایسه درآمد و هزینه در ماه‌های اخیر
                </p>
              </div>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500 transition hover:bg-slate-50">
                ۶ ماه اخیر
              </button>
            </div>

            <div className="mt-8 flex h-64 items-end gap-3 sm:gap-6">
              {chartData.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div className="flex h-[210px] w-full items-end justify-center gap-1.5 sm:gap-2">
                    <div
                      className="w-2.5 rounded-t-md bg-emerald-500 sm:w-4"
                      style={{
                        height: `${item.income}%`,
                      }}
                    />

                    <div
                      className="w-2.5 rounded-t-md bg-slate-200 sm:w-4"
                      style={{
                        height: `${item.expense}%`,
                      }}
                    />
                  </div>

                  <span className="mt-3 text-[10px] text-slate-400 sm:text-xs">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                درآمد
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                هزینه
              </div>
            </div>
          </div>

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

        <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            href="/panel/transactions/new?type=income"
            icon="↗"
            title="ثبت درآمد"
            description="یک درآمد جدید ثبت کنید"
          />

          <QuickAction
            href="/panel/transactions/new?type=expense"
            icon="↘"
            title="ثبت هزینه"
            description="یک هزینه جدید ثبت کنید"
          />

          <QuickAction
            href="/panel/accounts"
            icon="◈"
            title="حساب‌های من"
            description="مدیریت حساب‌ها و موجودی"
          />
        </section>
      </main>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  suffix,
  icon,
  description,
  positive = false,
}: {
  title: string;
  value: string;
  suffix: string;
  icon: string;
  description: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              {value}
            </span>

            <span className="text-xs text-slate-400">{suffix}</span>
          </div>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-600">
          {icon}
        </div>
      </div>

      <p
        className={`mt-5 text-xs ${
          positive ? "text-emerald-600" : "text-slate-400"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-200/50"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>

        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>

      <span className="mr-auto text-slate-300 transition group-hover:text-emerald-500">
        ←
      </span>
    </Link>
  );
}
