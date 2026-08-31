import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SideMenu from "@/components/SideMenu";
import { MobileNavMenu } from "@/components/MobileNavMenu";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-slate-50">
      <SideMenu />
      <MobileNavMenu />

      <div className="lg:mr-76 pt-6 pb-24 lg:pb-6">{children}</div>
    </div>
  );
}
