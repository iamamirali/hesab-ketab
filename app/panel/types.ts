export interface IDashboardSummary {
  total_income: number;
  total_expense: number;
  expenses_by_category: IExpensesByCategory[];
}

export interface IExpensesByCategory {
  category_id: string;
  category_name: string;
  total: number;
}
