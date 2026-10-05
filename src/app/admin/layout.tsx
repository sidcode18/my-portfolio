import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/ui/admin-sidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen md:pl-64">
      <AdminSidebar />
      <main className="relative min-h-screen p-6 md:p-8">{children}</main>
    </div>
  );
}
