import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const description =
    product.description ||
    (product.price
      ? `₦${Number(product.price).toLocaleString()} — available at 3ple Star Electrical Technology.`
      : "Contact 3ple Star Electrical Technology for pricing.");

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: product.image_urls?.[0] ? [{ url: product.image_urls[0] }] : undefined,
    },
    twitter: {
      title: product.name,
      description,
      images: product.image_urls?.[0] ? [product.image_urls[0]] : undefined,
    },
  };
}