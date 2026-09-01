import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/blog/BlockRenderer";
import type { Metadata } from "next";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — 3ple Star Electrical Technology` };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="container">
      <article>
        <h1>{post.title}</h1>
        {post.published_at && (
          <p className="muted">{new Date(post.published_at).toLocaleDateString()}</p>
        )}
        {post.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image} alt="" className="blog-cover" />
        )}
        <BlockRenderer blocks={post.body} />
      </article>
    </main>
  );
}