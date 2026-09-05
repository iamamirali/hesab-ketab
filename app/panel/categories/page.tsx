import { ToggleCategoryButton } from "./components/ToggleCategoryButton";
import { ECategoryType } from "./types";
import { Suspense } from "react";
import { CategoriesList } from "./components/CategoriesList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AddCategoryCard } from "./components/AddCategoryCard";

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
    <main className="w-full px-5 lg:px-8">
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
