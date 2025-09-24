import AdminOrdersPage from "@/components/admin/AdminOrdersPage";
import { AdminAuthGuard } from "@/components/AuthGuard";

export default function AdminPage() {
  return (
    <AdminAuthGuard>
      <AdminOrdersPage />
    </AdminAuthGuard>
  );
}
