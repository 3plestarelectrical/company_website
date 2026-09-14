import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/blog/BlockRenderer";
import { plainTextExcerpt } from "@/lib/blocks";
import type { Metadata } from "next";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const description = plainTextExcerpt(post.body);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
    },
    twitter: {
      title: post.title,
      description,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
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