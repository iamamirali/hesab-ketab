"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/green.css";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  disabled?: boolean;
};

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export function RHFDatePicker<T extends FieldValues>({
  name,
  control,
  placeholder = "انتخاب تاریخ",
  disabled,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="w-full">
          <DatePicker
            value={field.value}
            onChange={(date) => {
              if (!date || Array.isArray(date)) {
                field.onChange(null);
                return;
              }

              field.onChange(date.toDate());
            }}
            calendar={persian}
            monthYearSeparator="|"
            locale={persian_fa}
            format="DD MMMM YYYY"
            placeholder={placeholder}
            weekDays={weekDays}
            calendarPosition="bottom-right"
            disabled={disabled}
            inputClass="w-full border border-slate-300 cursor-pointer rounded-xl p-2.5 disabled:bg-slate-50"
            containerClassName="w-full"
            className="rmdp-mobile green"
          />

          {fieldState.error && (
            <p className="mt-1.5 text-xs text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
