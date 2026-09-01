import Link from "next/link";
import { listPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await listPublishedPosts();

  return (
    <main className="container">
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p className="muted">No posts published yet — check back soon.</p>
      ) : (
        <div className="grid-2">
          {posts.map((post) => (
            <article key={post.id} className="card">
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              {post.published_at && (
                <p className="muted">{new Date(post.published_at).toLocaleDateString()}</p>
              )}
              <Link href={`/blog/${post.slug}`} className="link">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
