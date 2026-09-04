import SideMenu from "@/components/SideMenu";
import { MobileNavMenu } from "@/components/MobileNavMenu";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50 flex grow">
      <SideMenu />
      <MobileNavMenu />

      <div className="lg:mr-76 pt-6 pb-24 lg:pb-6 w-full">{children}</div>
    </div>
  );
}
