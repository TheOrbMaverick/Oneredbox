import { cookies } from "next/headers";
import { HeaderContent } from "@/components/header-content";

export async function Header() {
  const cookieStore = await cookies();
  const session = cookieStore.get("dashboard_session");
  const hasSession = !!session?.value;

  return <HeaderContent hasSession={hasSession} />;
}
