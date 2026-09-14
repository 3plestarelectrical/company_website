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

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="container">
      <div className="grid-2">
        <div>
          {product.image_urls[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image_urls[0]} alt={product.name} className="product-detail-image" />
          ) : (
            <div className="product-image-placeholder" aria-hidden="true" />
          )}
        </div>
        <div>
          <h1>{product.name}</h1>
          <p className="price">
            {product.price ? `₦${Number(product.price).toLocaleString()}` : "Contact for price"}
          </p>
          <p>{product.description}</p>
          <a
            className="btn"
            href={`https://wa.me/2348061975051?text=${encodeURIComponent(
              `Hi, I'd like a quote for: ${product.name}`
            )}`}
            target="_blank"
            rel="noopener"
          >
            WhatsApp Quote Request
          </a>
        </div>
      </div>

      <section className="service-block">
        <h2>Or send us a message</h2>
        <ContactForm type="quote" />
      </section>
    </main>
  );
}