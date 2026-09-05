"use client";

import Select, { type StylesConfig, type SingleValue } from "react-select";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useState } from "react";

export type SelectOption<T = number> = {
  id: T;
  label: string;
};

type RHFSelectProps<TFieldValues extends FieldValues, TValue = number> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  getOptionsAction: () => Promise<SelectOption<TValue>[]>;
  placeholder?: string;
  isClearable?: boolean;
  disabled?: boolean;
};

export function RHFSelect<TFieldValues extends FieldValues, TValue = number>({
  name,
  control,
  getOptionsAction,
  placeholder = "انتخاب کنید",
  isClearable = true,
  disabled = false,
}: RHFSelectProps<TFieldValues, TValue>) {
  const [options, setOptions] = useState<SelectOption<TValue>[]>([]);
  const [loading, setLoading] = useState(false);

  const handleMenuOpen = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setOptions([]);

      const result = await getOptionsAction();

      setOptions((current) => {
        const map = new Map<TValue, SelectOption<TValue>>();

        for (const option of current) {
          map.set(option.id, option);
        }

        for (const option of result) {
          map.set(option.id, option);
        }

        return Array.from(map.values());
      });
    } finally {
      setLoading(false);
    }
  };

  const styles: StylesConfig<SelectOption<TValue>, false> = {
    control: (base, state) => ({
      ...base,
      minHeight: "44px",
      borderRadius: "0.75rem",
      borderColor: state.isFocused ? "#10b981" : "#d1d5db",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#10b981",
      },
      "&:active": {
        borderColor: "#10b981",
      },
      backgroundColor: disabled ? "#f3f4f6ba" : "#ffffff",
      transition: "all 150ms ease",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "2px 12px",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),

    singleValue: (base) => ({
      ...base,
      color: "#064e3b",
    }),

    menu: (base) => ({
      ...base,
      borderRadius: "0.75rem",
      overflow: "hidden",
      marginTop: "4px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    }),

    menuList: (base) => ({
      ...base,
      padding: "4px",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    }),

    option: (base, state) => ({
      ...base,
      borderRadius: "0.5rem",
      padding: "10px 12px",
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "#10b981"
        : state.isFocused
          ? "#d1fae5"
          : "transparent",
      color: state.isSelected ? "#ffffff" : "#064e3b",
      ":active": {
        backgroundColor: "var(--color-emerald-200)",
      },
    }),

    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? "#10b981" : "#9ca3af",
      "&:hover": {
        color: "#059669",
      },
    }),

    clearIndicator: (base) => ({
      ...base,
      color: "#9ca3af",
      "&:hover": {
        color: "#ef4444",
      },
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    input: (base) => ({
      ...base,
      color: "#064e3b",
    }),

    loadingIndicator: (base) => ({
      ...base,
      color: "#10b981",
    }),

    noOptionsMessage: (base) => ({
      ...base,
      color: "#6b7280",
    }),
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Select<SelectOption<TValue>, false>
            options={options}
            value={field.value}
            onMenuOpen={handleMenuOpen}
            // menuIsOpen={true}
            onChange={(option: SingleValue<SelectOption<TValue>>) => {
              field.onChange(option ?? null);
            }}
            onBlur={field.onBlur}
            ref={field.ref}
            isLoading={loading}
            isDisabled={disabled}
            isClearable={isClearable}
            placeholder={placeholder}
            noOptionsMessage={(obj) => `${obj.inputValue} یافت نشد`}
            loadingMessage={() => "درحال جستجو..."}
            getOptionValue={(option) => String(option.id)}
            styles={styles}
          />

          {fieldState.error && (
            <p className="mt-1 text-xs text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
