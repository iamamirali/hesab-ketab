export enum ECategoryType {
  Income = "income",
  Expense = "expense",
}

export interface ICategory {
  name: string;
  type: ECategoryType;
  id: string;
  user_id: string;
}
