import { DashboardSummary } from "./_components/DashboardSummary";
import { DashboardHeader } from "./_components/DashboardHeader";

export default function PanelPage() {
  return (
    <div>
      <DashboardHeader />

      <main className="mx-auto px-5 mt-9 lg:mt-8 lg:px-8">
        <DashboardSummary />
      </main>
    </div>
  );
}
