import { listPosts } from "@/lib/posts";
import AdminLink from "@/components/admin/AdminLink";

export default async function AdminBlogListPage() {
  const posts = await listPosts();

  return (
    <div className="admin-blog-list">
      <div className="admin-page-header">
        <h1>Blog Posts</h1>
        <AdminLink href="/admin/blog/new" className="btn">
          + New Post
        </AdminLink>
      </div>

      {posts.length === 0 ? (
        <p className="empty-state">No posts yet. Create your first one.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <AdminLink href={`/admin/blog/${post.id}`}>{post.title || "(untitled)"}</AdminLink>
                </td>
                <td>
                  <span className={`status-badge status-${post.status}`}>{post.status}</span>
                </td>
                <td>{new Date(post.updated_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
