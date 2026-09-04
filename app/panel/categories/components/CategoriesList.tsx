import { getCategoriesAction } from "../actions/categories.action";
import { ECategoryType } from "../types";
import { CategoryCard } from "./CategoryCard";

export async function CategoriesList({ type }: { type: ECategoryType }) {
  const categories = await getCategoriesAction(type);

  return categories?.map((item) => <CategoryCard key={item.id} {...item} />);
}
