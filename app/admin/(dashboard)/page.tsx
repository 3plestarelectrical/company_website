import { query } from "@/lib/db";
import { auth } from "@/lib/auth";
import AdminLink from "@/components/admin/AdminLink";

export default async function AdminDashboardPage() {
  const session = await auth();
  const userEmail = session?.user?.email ?? "";

  const [{ count: newInquiries }] = await query<{ count: string }>(
    `select count(*) from inquiries where status = 'new'`
  );
  const [{ count: draftPosts }] = await query<{ count: string }>(
    `select count(*) from posts where status = 'draft'`
  );
  const [{ count: activeProducts }] = await query<{ count: string }>(
    `select count(*) from products where active = true`
  );

  return (
    <div className="admin-dashboard">
      <h1>Welcome, {userEmail}</h1>
      <div className="dashboard-stats grid-3">
        <AdminLink href="/admin/inquiries" className="card stat-card">
          <span className="stat-number">{newInquiries}</span>
          <span className="stat-label">New inquiries</span>
        </AdminLink>
        <AdminLink href="/admin/blog" className="card stat-card">
          <span className="stat-number">{draftPosts}</span>
          <span className="stat-label">Draft posts</span>
        </AdminLink>
        <AdminLink href="/admin/catalog" className="card stat-card">
          <span className="stat-number">{activeProducts}</span>
          <span className="stat-label">Active products</span>
        </AdminLink>
      </div>
    </div>
  );
}
