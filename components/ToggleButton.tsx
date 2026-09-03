"use client";

import { Key } from "react";

type ToggleOption<T> = {
  label: string;
  value: T;
};

type ToggleButtonProps<T> = {
  options: ToggleOption<T>[];
  className?: string;
  selectedButtonClassName?: string;
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
};

export function ToggleButton<T = string>({
  options,
  value,
  onChange,
  className,
  selectedButtonClassName,
  disabled,
}: ToggleButtonProps<T>) {
  return (
    <div
      className={`inline-flex rounded-full bg-white p-1 w-full ${className ?? ""}`}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value as Key}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={`rounded-full cursor-pointer w-full px-4 py-1 h-full text-sm font-medium transition-all duration-200 ${
              isSelected
                ? (selectedButtonClassName ??
                  "bg-emerald-100 text-emerald-800 shadow-sm")
                : "text-gray-500 hover:text-gray-800"
            } ${disabled ? "opacity-50" : "opacity-100"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
