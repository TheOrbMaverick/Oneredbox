import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/dashboard-content";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const clientId = cookieStore.get("dashboard_session")?.value;

  if (!clientId) {
    redirect("/");
  }

  return <DashboardContent clientId={clientId} />;
}
