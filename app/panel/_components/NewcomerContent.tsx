import Link from "next/link";

type Props = {
  step: 1 | 2;
};

export function NewcomerContent(props: Props) {
  const { step } = props;

  if (step === 1) {
    return (
      <div className="bg-white flex flex-col text-center items-center gap-4 lg:text-start lg:flex-row lg:justify-between p-4 border border-slate-200 rounded-2xl">
        <p className="font-medium">
          خوش اومدی <br />
          برای شروع یک دسته بندی درست کن
        </p>
        <Link
          href="/panel/categories"
          className="block w-fit rounded-xl bg-emerald-600 py-3 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          ایجاد دسته بندی
        </Link>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="bg-white text-center text-lg px-6 py-9 border border-slate-200 rounded-2xl">
        <p className="font-medium">اولین تراکنشت رو ثبت کن</p>
      </div>
    );
  }
}
