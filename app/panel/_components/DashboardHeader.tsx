import { getUserFullNameAction } from "../_actions/getUserName.action";

export async function DashboardHeader() {
  const { data } = await getUserFullNameAction();

  return (
    <header className="border rounded-2xl mx-5 lg:mx-8 border-slate-200 bg-white">
      <div className="mx-auto flex h-20 items-center justify-between px-5 lg:px-8">
        <h1 className="mt-1 text-xl font-bold text-slate-900">
          سلام {data?.full_name} 👋
        </h1>
      </div>
    </header>
  );
}
