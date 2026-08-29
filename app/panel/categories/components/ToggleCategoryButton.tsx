"use client";

import { ToggleButton } from "@/components/ToggleButton";
import { useState } from "react";

export function ToggleCategoryButton() {
  const [type, setType] = useState<"income" | "expense">("income");

  return (
    <ToggleButton
      value={type}
      onChange={setType}
      options={[
        { label: "درآمد", value: "income" },
        { label: "هزینه", value: "expense" },
      ]}
      selectedButtonClassName={`${type === "income" ? "text-emerald-800 bg-emerald-100" : "text-red-800 bg-red-100"}`}
      className="sm:w-60! h-12 sm:h-auto"
    />
  );
}
