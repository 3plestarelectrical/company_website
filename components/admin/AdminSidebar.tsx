import AdminLink from "./AdminLink";
import SignOutButton from "./SignOutButton";

export default function AdminSidebar() {
  return (
    <nav className="admin-sidebar" aria-label="Admin navigation">
      <div className="admin-sidebar-logo">3ple Star Admin</div>
      <AdminLink href="/admin">Dashboard</AdminLink>
      <AdminLink href="/admin/blog">Blog Posts</AdminLink>
      <AdminLink href="/admin/catalog">Catalog</AdminLink>
      <AdminLink href="/admin/projects">Our Work</AdminLink>
      <AdminLink href="/admin/inquiries">Inquiries</AdminLink>
      <SignOutButton />
    </nav>
  );
}
