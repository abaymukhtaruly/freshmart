import AdminNav from "@/components/admin/AdminNav";

// TODO: Protect /admin routes with authentication (require Role.ADMIN).

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-68px)]">
      <AdminNav />
      <div className="flex-1 p-8 bg-background overflow-auto">{children}</div>
    </div>
  );
}
