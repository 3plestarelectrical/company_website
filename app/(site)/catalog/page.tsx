import Link from "next/link";
import { listActiveProducts } from "@/lib/products";

export const revalidate = 60;

export default async function CatalogPage() {
  const products = await listActiveProducts();

  return (
    <main className="container">
      <h1>Catalog</h1>
      <p className="muted">
        Browse our products below. Tap &ldquo;Request Quote&rdquo; on anything you need — no
        checkout, we&rsquo;ll follow up directly.
      </p>
      {products.length === 0 ? (
        <p className="muted">Catalog coming soon.</p>
      ) : (
        <div className="products grid-3">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              {p.image_urls[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_urls[0]} alt={p.name} />
              ) : (
                <div className="product-image-placeholder" aria-hidden="true" />
              )}
              <strong>{p.name}</strong>
              <div className="price">
                {p.price ? `₦${Number(p.price).toLocaleString()}` : "Contact for price"}
              </div>
              <Link href={`/catalog/${p.slug}`} className="btn">
                View / Request Quote
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
