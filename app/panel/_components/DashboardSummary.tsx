import { ReactNode } from "react";
import { getDashboardSummaryAction } from "../_actions/getDashboardSummary.action";
import {
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  DiffIcon,
} from "lucide-react";
import { ECategoryType } from "../categories/types";
import { LatestTransactions } from "./LatestTransactions";

export async function DashboardSummary() {
  const { data } = await getDashboardSummaryAction();
  const amountDiff = (data?.total_income ?? 0) - (data?.total_expense ?? 0);

  return (
    <section className="flex flex-col gap-9">
      <div className="flex flex-col xl:flex-row w-full gap-6">
        <SummaryCard
          title="مجموع درآمد"
          icon={<BanknoteArrowDownIcon />}
          value={data?.total_income}
          type={ECategoryType.Income}
        />
        <SummaryCard
          title="مجموع هزینه"
          icon={<BanknoteArrowUpIcon />}
          value={data?.total_expense}
          type={ECategoryType.Expense}
        />
        <SummaryCard
          title="باقی مانده"
          icon={<DiffIcon />}
          value={amountDiff}
          type={amountDiff > 0 ? ECategoryType.Income : ECategoryType.Expense}
          showPositive={true}
        />
      </div>

      <LatestTransactions />

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900">هزینه‌ها</h2>
            <p className="mt-1 text-sm text-slate-400">بر اساس دسته‌بندی</p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          {data?.expenses_by_category?.map((expense) => (
            <div
              key={expense.category_id}
              className="flex justify-between md:justify-baseline md:grid md:grid-cols-[200px_1fr_200px] items-center"
            >
              <span className="truncate text-sm text-slate-600">
                {expense.category_name}
              </span>

              <div className="mx-3 border-t border-dashed border-slate-300" />

              <span className="text-left text-sm font-semibold text-slate-700">
                {new Intl.NumberFormat("fa-IR").format(expense.total)} تومان
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  type,
  showPositive,
}: {
  title: string;
  value: number | undefined;
  icon: ReactNode;
  type: ECategoryType;
  showPositive?: boolean;
}) {
  const formattedValue = value
    ? new Intl.NumberFormat("fa-IR").format(value)
    : "-";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-6 lg:py-8 w-full shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-800 font-semibold">{title}</p>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span
              className={`text-2xl font-bold tracking-tight ${type === ECategoryType.Income ? "text-emerald-600" : "text-red-600"}`}
            >
              <bdi>
                {showPositive && (value ?? 0) > 0 ? "+" : ""}
                {formattedValue}
              </bdi>
            </span>

            <span className="text-xs text-slate-400">تومان</span>
          </div>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${type === ECategoryType.Income ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
