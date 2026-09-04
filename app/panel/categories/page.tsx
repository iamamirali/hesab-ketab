import { ToggleCategoryButton } from "./components/ToggleCategoryButton";
import { ECategoryType } from "./types";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { CategoriesList } from "./components/CategoriesList";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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

  return (
    <main className="w-full max-w-7xl px-5 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">دسته بندی تراکنش ها</h1>
        <ToggleCategoryButton />
      </div>
      <div className="flex flex-col gap-4">
        <AddCategoryCard type={type} />
        <Suspense fallback={<LoadingSpinner />}>
          <CategoriesList type={type} />
        </Suspense>
      </div>
    </main>
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
