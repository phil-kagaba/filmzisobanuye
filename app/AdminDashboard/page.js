import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();

  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/AdminLoginPage");
  }

  return <AdminDashboardClient />;
}