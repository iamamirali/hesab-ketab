import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SideMenu from "@/components/SideMenu";

export default async function PanelLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
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

      <div className="lg:mr-80">{children}</div>

      {modal}
    </div>
  );
}
