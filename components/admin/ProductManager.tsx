"use client";

import { useState } from "react";
import type { ProductRow } from "@/lib/products";
import { saveProductAction, deleteProductAction } from "@/app/admin/(dashboard)/catalog/actions";

const emptyForm = { id: undefined as string | undefined, name: "", description: "", price: "", category: "", active: true };

export default function ProductManager({ initialProducts }: { initialProducts: ProductRow[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  function startEdit(p: ProductRow) {
    setForm({
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      price: p.price ?? "",
      category: p.category ?? "",
      active: p.active,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveProductAction(form);
      // Optimistic-ish: refetch is simplest since Server Actions revalidate the route,
      // but for immediate feedback in this client list we just reload from the server.
      window.location.reload();
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this product?")) return;
    await deleteProductAction(id);
    setProducts(products.filter((p) => p.id !== id));
  }

  return (
    <div className="product-manager">
      <form onSubmit={handleSubmit} className="form product-form">
        <h2>{form.id ? "Edit product" : "Add product"}</h2>
        <label>
          Name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          Description
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label>
          Price (₦, optional — leave blank for &ldquo;contact for price&rdquo;)
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </label>
        <label>
          Category
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Visible on site
        </label>
        <div className="form-actions">
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Saving…" : form.id ? "Update product" : "Add product"}
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm(emptyForm)}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Visible</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category || "—"}</td>
              <td>{p.price ? `₦${Number(p.price).toLocaleString()}` : "Contact for price"}</td>
              <td>{p.active ? "Yes" : "No"}</td>
              <td>
                <button type="button" onClick={() => startEdit(p)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
