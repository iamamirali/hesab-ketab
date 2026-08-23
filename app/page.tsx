import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <section className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-50" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white shadow-lg shadow-emerald-600/20">
              ر
            </div>

            <span className="text-lg font-bold text-slate-900">حساب کتاب</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900 sm:block"
            >
              ورود
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              شروع کنید
            </Link>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 lg:px-8 lg:pb-32 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              مدیریت هوشمند امور مالی
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              کنترل بیشتری روی
              <span className="block text-emerald-600">
                پول خود داشته باشید
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              درآمدها، هزینه‌ها و وضعیت مالی خود را در یک محیط ساده و منظم
              مدیریت کنید و همیشه بدانید پولتان کجا خرج می‌شود.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 px-7 text-sm font-semibold text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
              >
                ایجاد حساب رایگان
              </Link>

              <Link
                href="/login"
                className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
              >
                ورود به حساب
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="relative rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/40">
              <div className="rounded-2xl bg-slate-50 p-5 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="h-3 w-24 rounded-full bg-slate-200" />
                    <div className="mt-3 h-7 w-40 rounded-lg bg-slate-200" />
                  </div>

                  <div className="h-10 w-10 rounded-xl bg-emerald-100" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <DashboardCard
                    title="موجودی کل"
                    value="۲۴,۸۵۰,۰۰۰"
                    suffix="تومان"
                  />

                  <DashboardCard
                    title="درآمد این ماه"
                    value="۱۲,۴۰۰,۰۰۰"
                    suffix="تومان"
                  />

                  <DashboardCard
                    title="هزینه این ماه"
                    value="۵,۸۵۰,۰۰۰"
                    suffix="تومان"
                  />
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-28 rounded bg-slate-200" />
                      <div className="h-8 w-20 rounded-lg bg-slate-100" />
                    </div>

                    <div className="mt-8 flex h-40 items-end gap-3">
                      <ChartBar height="35%" />
                      <ChartBar height="55%" />
                      <ChartBar height="42%" />
                      <ChartBar height="72%" />
                      <ChartBar height="58%" />
                      <ChartBar height="88%" />
                      <ChartBar height="68%" />
                      <ChartBar height="95%" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="h-4 w-28 rounded bg-slate-200" />

                    <div className="mt-6 space-y-4">
                      <TransactionItem title="خرید روزانه" amount="-۳۵۰,۰۰۰" />

                      <TransactionItem
                        title="دریافت حقوق"
                        amount="+۱۲,۰۰۰,۰۰۰"
                        positive
                      />

                      <TransactionItem title="قبض اینترنت" amount="-۲۸۰,۰۰۰" />

                      <TransactionItem title="رستوران" amount="-۵۲۰,۰۰۰" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-emerald-600">امکانات</p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              همه چیز برای مدیریت مالی ساده
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              ابزارهای مورد نیازتان را در یک محیط ساده و قابل فهم در اختیار
              داشته باشید.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon="↗"
              title="مدیریت درآمد و هزینه"
              description="تمام درآمدها و هزینه‌های خود را ثبت کنید و تصویر واضحی از وضعیت مالی خود داشته باشید."
            />

            <FeatureCard
              icon="◈"
              title="دسته‌بندی تراکنش‌ها"
              description="تراکنش‌های خود را دسته‌بندی کنید تا بدانید بیشترین هزینه‌های شما مربوط به چه بخش‌هایی است."
            />

            <FeatureCard
              icon="⌁"
              title="گزارش مالی"
              description="وضعیت درآمد، هزینه و موجودی خود را بررسی کنید و تصمیم‌های مالی بهتری بگیرید."
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8 lg:py-24">
          <div className="rounded-3xl bg-emerald-600 px-6 py-14 shadow-2xl shadow-emerald-600/20 sm:px-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              مدیریت مالی خود را از امروز شروع کنید
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-50">
              با چند قدم ساده حساب خود را ایجاد کنید و کنترل بیشتری روی درآمد و
              هزینه‌های خود داشته باشید.
            </p>

            <Link
              href="/signup"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-white px-7 text-sm font-semibold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              ایجاد حساب رایگان
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-7 text-sm text-slate-400 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
              ر
            </div>

            <span>حساب کتاب</span>
          </div>

          <p>ساخته شده توسط امیرعلی شعبانی</p>
        </div>
      </footer>
    </main>
  );
}

function DashboardCard({
  title,
  value,
  suffix,
}: {
  title: string;
  value: string;
  suffix: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-400">{title}</p>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-xl font-bold text-slate-800">{value}</span>

        <span className="text-xs text-slate-400">{suffix}</span>
      </div>

      <div className="mt-4 h-1.5 w-20 rounded-full bg-emerald-100">
        <div className="h-full w-3/4 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}

function ChartBar({ height }: { height: string }) {
  return (
    <div className="flex-1 rounded-t-lg bg-emerald-500/80" style={{ height }} />
  );
}

function TransactionItem({
  title,
  amount,
  positive = false,
}: {
  title: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-slate-100" />

        <div>
          <p className="text-sm font-medium text-slate-700">{title}</p>

          <div className="mt-1 h-2 w-16 rounded-full bg-slate-100" />
        </div>
      </div>

      <span
        className={`text-xs font-semibold ${
          positive ? "text-emerald-600" : "text-slate-500"
        }`}
      >
        {amount}
      </span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl font-bold text-emerald-600">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}
