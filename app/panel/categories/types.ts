export enum ECategoryType {
  Income = "income",
  Expense = "expense",
}

export interface ICategory {
  name: string;
  type: ECategoryType;
  id: number;
  user_id: number;
}
