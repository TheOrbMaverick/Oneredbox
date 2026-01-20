import LoginForm from "@/components/login-form-page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("dashboard_session");

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
