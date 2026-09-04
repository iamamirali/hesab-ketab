import { Suspense } from "react";
import { TransactionsList } from "./components/TransactionsList";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function TransactionsPage() {
  return (
    <main className="w-full max-w-7xl px-5 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">تراکنش های من</h1>
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<LoadingSpinner />}>
          <TransactionsList />
        </Suspense>
      </div>
    </main>
  );
}
