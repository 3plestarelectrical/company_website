"use client";

import { useState } from "react";
import type { ProjectRow } from "@/lib/projects";
import { saveProjectAction, deleteProjectAction } from "@/app/admin/(dashboard)/projects/actions";

const emptyForm = {
  id: undefined as string | undefined,
  title: "",
  description: "",
  image_url: "",
  featured: false,
  active: true,
};

export default function ProjectManager({ initialProjects }: { initialProjects: ProjectRow[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  function startEdit(p: ProjectRow) {
    setForm({
      id: p.id,
      title: p.title,
      description: p.description ?? "",
      image_url: p.image_url,
      featured: p.featured,
      active: p.active,
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
      setForm((f) => ({ ...f, image_url: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.image_url) {
      setError("Upload a photo before saving.");
      return;
    }
    setIsSaving(true);
    try {
      await saveProjectAction(form);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this project photo?")) return;
    await deleteProjectAction(id);
    setProjects(projects.filter((p) => p.id !== id));
  }

  return (
    <div className="product-manager">
      <form onSubmit={handleSubmit} className="form product-form">
        <h2>{form.id ? "Edit project" : "Add project"}</h2>

        {form.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image_url} alt="" className="block-image-preview" />
        ) : (
          <p className="empty-state">No photo uploaded yet.</p>
        )}
        <input type="file" accept="image/*" onChange={handleFileSelect} disabled={isUploading} />
        {isUploading && <span role="status">Uploading…</span>}

        <label>
          Title
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. 5kVA Hybrid Install — Kaduna"
          />
        </label>
        <label>
          Caption / Description
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Short note about the job"
          />
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured (show in homepage carousel)
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Visible in gallery
        </label>

        {error && (
          <p role="alert" className="error-text">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || isUploading}>
            {isSaving ? "Saving…" : form.id ? "Update project" : "Add project"}
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
            <th>Title</th>
            <th>Featured</th>
            <th>Visible</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image_url} alt="" className="admin-thumb" />
              </td>
              <td>{p.title}</td>
              <td>{p.featured ? "Yes" : "No"}</td>
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
