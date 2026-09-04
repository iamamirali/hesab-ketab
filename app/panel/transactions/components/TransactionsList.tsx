import { getTransactionsAction } from "../actions/transactions.action";
import { TransactionCard } from "./TransactionCard";

export async function TransactionsList() {
  const response = await getTransactionsAction();

  return response.data?.map((item) => (
    <TransactionCard key={item.id} {...item} />
  ));
}
