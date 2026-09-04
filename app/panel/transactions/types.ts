import { ICategory } from "../categories/types";

export interface ITransaction {
  id: number;
  user_id: string;
  created_at: string;
  category_id: string;
  amount: number;
  description: string | null;
  category: ICategory;
}
