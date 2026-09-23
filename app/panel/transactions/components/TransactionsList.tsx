import { NoItemFound } from "@/components/NoItemFound";
import { getTransactionsAction } from "../actions/transactions.action";
import { TransactionCard } from "./TransactionCard";

export async function TransactionsList() {
  const response = await getTransactionsAction();

  if (response?.data?.length === 0) {
    return <NoItemFound />;
  }

  return response.data?.map((item) => (
    <TransactionCard key={item.id} {...item} />
  ));
}
