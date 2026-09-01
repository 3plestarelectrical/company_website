import { listProducts } from "@/lib/products";
import ProductManager from "@/components/admin/ProductManager";

export default async function AdminCatalogPage() {
  const products = await listProducts();

  return (
    <div className="admin-catalog">
      <h1>Catalog</h1>
      <p className="muted">
        Browse-and-inquire catalog — no checkout. Each item shows a &ldquo;Request Quote&rdquo;
        button on the public site.
      </p>
      <ProductManager initialProducts={products} />
    </div>
  );
}
