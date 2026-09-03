"use client";

import { ToggleButton } from "@/components/ToggleButton";
import { useTransition } from "react";
import { ECategoryType } from "../types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ToggleCategoryButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const type =
    searchParams.get("type") === ECategoryType.Income
      ? ECategoryType.Income
      : ECategoryType.Expense;

  const handleChange = (value: ECategoryType) => {
    const params = new URLSearchParams(searchParams);

    params.set("type", value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <ToggleButton
      value={type}
      onChange={handleChange}
      disabled={isPending}
      options={[
        { label: "هزینه", value: ECategoryType.Expense },
        { label: "درآمد", value: ECategoryType.Income },
      ]}
      selectedButtonClassName={`${type === ECategoryType.Income ? "text-emerald-800 bg-emerald-100" : "text-red-800 bg-red-100"}`}
      className="sm:w-60! h-12 sm:h-auto"
    />
  );
}
