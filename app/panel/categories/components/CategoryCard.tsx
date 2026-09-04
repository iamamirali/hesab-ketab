import { BanknoteArrowDownIcon, BanknoteArrowUpIcon } from "lucide-react";
import { ECategoryType } from "../types";

export function CategoryCard({
  name,
  type,
}: {
  name: string;
  type: ECategoryType;
}) {
  const isIncome = type === ECategoryType.Income;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50">
      <div className="flex min-w-0 items-center gap-3">
        {isIncome ? (
          <BanknoteArrowDownIcon className="text-emerald-500" />
        ) : (
          <BanknoteArrowUpIcon className="text-red-600" />
        )}

        <h3 className="truncate font-bold text-slate-800">{name}</h3>
      </div>
    </div>
  );
}
