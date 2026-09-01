"use client";

import { useState } from "react";
import type { ImageBlock } from "@/types/blocks";

type Props = {
  block: ImageBlock;
  onChange: (block: ImageBlock) => void;
};

export default function ImageBlockEditor({ block, onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");
    try {
      const res = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      onChange({ ...block, url });
    } catch {
      setUploadError("Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="block-editor block-editor-image">
      {block.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={block.url} alt={block.alt || ""} className="block-image-preview" />
      ) : (
        <p className="empty-state">No image uploaded yet.</p>
      )}

      <input type="file" accept="image/*" onChange={handleFileSelect} disabled={isUploading} />
      {isUploading && <span role="status">Uploading…</span>}
      {uploadError && <span role="alert" className="error-text">{uploadError}</span>}

      <input
        type="text"
        value={block.alt}
        placeholder="Alt text (describe the image)"
        onChange={(e) => onChange({ ...block, alt: e.target.value })}
      />
      <input
        type="text"
        value={block.caption ?? ""}
        placeholder="Caption (optional)"
        onChange={(e) => onChange({ ...block, caption: e.target.value })}
      />
    </div>
  );
}
