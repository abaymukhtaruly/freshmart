import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/login?callbackUrl=/admin&error=forbidden");
  }

  return (
    <div className="flex min-h-[calc(100vh-68px)]">
      <AdminNav />
      <div className="flex-1 p-8 bg-background overflow-auto">{children}</div>
    </div>
  );
}
