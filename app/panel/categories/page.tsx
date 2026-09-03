import { ToggleCategoryButton } from "./components/ToggleCategoryButton";
import { ECategoryType } from "./types";
import { getCategoriesAction } from "./actions/categories.action";
import {
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  PlusIcon,
} from "lucide-react";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const type: ECategoryType =
    params.type === ECategoryType.Income
      ? ECategoryType.Income
      : ECategoryType.Expense;

  const categories = await getCategoriesAction(type);

  return (
    <main className="w-full max-w-7xl px-5 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">دسته بندی تراکنش ها</h1>
        <ToggleCategoryButton />
      </div>
      <div className="flex flex-col gap-4">
        <AddCategoryCard type={type} />
        {categories?.map((item) => (
          <CategoryCard key={item.id} name={item.name} type={item.type} />
        ))}
      </div>
    </main>
  );
}

function CategoryCard({ name, type }: { name: string; type: ECategoryType }) {
  const isIncome = type === ECategoryType.Income;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50">
      <div className="flex min-w-0 items-center gap-3">
        {isIncome ? (
          <BanknoteArrowDownIcon className="text-emerald-500" />
        ) : (
          <BanknoteArrowUpIcon className="text-red-600" />
        )}

        <h3 className="truncate font-bold text-slate-800">{name}</h3>
      </div>
    </div>
  );
}

function AddCategoryCard({ type }: { type: ECategoryType }) {
  const isIncome = type === ECategoryType.Income;

  return (
    <button className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-white py-3 px-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl font-medium text-slate-400">
        <PlusIcon />
      </div>

      <p className="text-base font-semibold text-slate-700">
        افزودن دسته‌بندی {isIncome ? "درآمد" : "هزینه"}
      </p>
    </button>
  );
}
