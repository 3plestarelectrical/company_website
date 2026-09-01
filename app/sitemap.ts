import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/posts";
import { listActiveProducts } from "@/lib/products";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://3plestarelectricaltechnology.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/training`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/catalog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const [posts, products] = await Promise.all([listPublishedPosts(), listActiveProducts()]);

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/catalog/${product.slug}`,
    lastModified: new Date(product.updated_at),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...productRoutes];
}
