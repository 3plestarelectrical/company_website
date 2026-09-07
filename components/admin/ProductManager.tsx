"use client";

import { useState } from "react";
import type { ProductRow } from "@/lib/products";
import { saveProductAction, deleteProductAction } from "@/app/admin/(dashboard)/catalog/actions";

const emptyForm = {
  id: undefined as string | undefined,
  name: "",
  description: "",
  price: "",
  category: "",
  active: true,
  image_urls: [] as string[],
};

export default function ProductManager({ initialProducts }: { initialProducts: ProductRow[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  function startEdit(p: ProductRow) {
    setForm({
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      price: p.price ?? "",
      category: p.category ?? "",
      active: p.active,
      image_urls: p.image_urls ?? [],
    });
    setError("");
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || data?.error || "Upload failed");
      setForm((f) => ({ ...f, image_urls: [...f.image_urls, data.url] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Try again.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(url: string) {
    setForm((f) => ({ ...f, image_urls: f.image_urls.filter((u) => u !== url) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSaving(true);
    try {
      await saveProductAction(form);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
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

        <div className="product-images-field">
          <span className="product-images-label">Photos</span>
          {form.image_urls.length > 0 && (
            <div className="product-image-grid">
              {form.image_urls.map((url) => (
                <div key={url} className="product-image-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" />
                  <button
                    type="button"
                    aria-label="Remove image"
                    className="product-image-remove"
                    onClick={() => removeImage(url)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleFileSelect} disabled={isUploading} />
          {isUploading && <span role="status">Uploading…</span>}
          <p className="block-hint">Add as many photos as you like. The first one is used as the main thumbnail.</p>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Visible on site
        </label>

        {error && (
          <p role="alert" className="error-text">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || isUploading}>
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
            <th>Photo</th>
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
              <td>
                {p.image_urls?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_urls[0]} alt="" className="admin-thumb" />
                ) : (
                  "—"
                )}
              </td>
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