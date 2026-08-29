import { ToggleButton } from "@/components/ToggleButton";
import Link from "next/link";
import { ToggleCategoryButton } from "./components/ToggleCategoryButton";

const expenseCategories = [
  {
    id: 1,
    name: "مواد غذایی",
    description: "خرید مواد غذایی و اقلام مصرفی",
    transactionCount: 18,
    amount: "۳,۲۰۰,۰۰۰",
  },
  {
    id: 2,
    name: "حمل و نقل",
    description: "تاکسی، بنزین و حمل و نقل عمومی",
    transactionCount: 12,
    amount: "۱,۴۵۰,۰۰۰",
  },
  {
    id: 3,
    name: "تفریح و رستوران",
    description: "رستوران، سینما و سرگرمی",
    transactionCount: 8,
    amount: "۱,۲۰۰,۰۰۰",
  },
  {
    id: 4,
    name: "قبوض",
    description: "آب، برق، گاز، اینترنت و تلفن",
    transactionCount: 6,
    amount: "۹۰۰,۰۰۰",
  },
  {
    id: 5,
    name: "خرید و پوشاک",
    description: "لباس، کفش و خریدهای شخصی",
    transactionCount: 5,
    amount: "۸۵۰,۰۰۰",
  },
];

const incomeCategories = [
  {
    id: 1,
    name: "حقوق",
    description: "حقوق و دستمزد",
    transactionCount: 1,
    amount: "۲۵,۰۰۰,۰۰۰",
  },
  {
    id: 2,
    name: "فریلنسری",
    description: "درآمد حاصل از پروژه‌ها و کارهای جانبی",
    transactionCount: 3,
    amount: "۵,۵۰۰,۰۰۰",
  },
  {
    id: 3,
    name: "سایر درآمدها",
    description: "سایر منابع درآمدی",
    transactionCount: 2,
    amount: "۲,۵۰۰,۰۰۰",
  },
];

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">دسته بندی تراکنش ها</h1>
        <ToggleCategoryButton />
      </div>

      <section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {expenseCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              type="expense"
            />
          ))}

          <AddCategoryCard type="expense" />
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            دسته‌بندی‌های درآمد
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            منابع درآمد خود را دسته‌بندی و مدیریت کنید.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {incomeCategories.map((category) => (
            <CategoryCard key={category.id} category={category} type="income" />
          ))}

          <AddCategoryCard type="income" />
        </div>
      </section>
    </main>
  );
}

function CategoryCard({
  category,
  type,
}: {
  category: {
    id: number;
    name: string;
    description: string;
    transactionCount: number;
    amount: string;
  };
  type: "income" | "expense";
}) {
  const isIncome = type === "income";

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-200/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
              isIncome
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {isIncome ? "↗" : "↘"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-bold text-slate-800">
              {category.name}
            </h3>

            <p className="mt-1 truncate text-xs text-slate-400">
              {category.description}
            </p>
          </div>
        </div>

        <Link
          href={`/panel/categories/${category.id}/edit`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
          aria-label={`ویرایش ${category.name}`}
        >
          ✎
        </Link>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">تراکنش‌ها</span>

          <span className="text-xs font-medium text-slate-600">
            {category.transactionCount} تراکنش
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">مجموع</span>

          <span
            className={`text-sm font-bold ${
              isIncome ? "text-emerald-600" : "text-slate-700"
            }`}
          >
            {isIncome ? "+" : "-"}
            {category.amount} تومان
          </span>
        </div>
      </div>
    </div>
  );
}

function AddCategoryCard({ type }: { type: "income" | "expense" }) {
  const isIncome = type === "income";

  return (
    <Link
      href={`/panel/categories/new?type=${type}`}
      className="flex min-h-[190px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:bg-emerald-50/30"
    >
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl font-medium text-slate-400 transition group-hover:bg-emerald-100 group-hover:text-emerald-600">
          +
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-700">
          افزودن دسته‌بندی {isIncome ? "درآمد" : "هزینه"}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          یک دسته‌بندی جدید ایجاد کنید
        </p>
      </div>
    </Link>
  );
}
