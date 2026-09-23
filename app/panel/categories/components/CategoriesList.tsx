import { NoItemFound } from "@/components/NoItemFound";
import { getCategoriesAction } from "../actions/categories.action";
import { ECategoryType } from "../types";
import { CategoryCard } from "./CategoryCard";

export async function CategoriesList({ type }: { type: ECategoryType }) {
  const categories = await getCategoriesAction(type);

  if (categories?.length === 0) {
    return <NoItemFound />;
  }

  return categories?.map((item) => <CategoryCard key={item.id} {...item} />);
}
