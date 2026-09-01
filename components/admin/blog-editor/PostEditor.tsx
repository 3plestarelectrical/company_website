"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Block, Post } from "@/types/blocks";
import { useEditorDirty } from "@/context/EditorDirtyContext";
import BlockList from "./BlockList";
import AddBlockMenu from "./AddBlockMenu";
import { createEmptyBlock } from "@/lib/blocks";
import { savePostAction } from "@/app/admin/(dashboard)/blog/actions";

export default function PostEditor({ initialPost }: { initialPost?: Post & { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [status, setStatus] = useState<Post["status"]>(initialPost?.status ?? "draft");
  const [blocks, setBlocks] = useState<Block[]>(initialPost?.body ?? []);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const { isDirty, setIsDirty } = useEditorDirty();

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  function updateTitle(value: string) {
    setTitle(value);
    setIsDirty(true);
  }
  function updateStatus(value: Post["status"]) {
    setStatus(value);
    setIsDirty(true);
  }
  function updateBlock(id: string, updated: Block) {
    setBlocks(blocks.map((b) => (b.id === id ? updated : b)));
    setIsDirty(true);
  }
  function removeBlock(id: string) {
    setBlocks(blocks.filter((b) => b.id !== id));
    setIsDirty(true);
  }
  function moveBlock(id: string, direction: "up" | "down") {
    const i = blocks.findIndex((b) => b.id === id);
    const j = direction === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    setBlocks(next);
    setIsDirty(true);
  }
  function addBlock(type: Block["type"]) {
    setBlocks([...blocks, createEmptyBlock(type)]);
    setIsDirty(true);
  }

  async function handleSave() {
    if (!title.trim()) {
      setSaveError("Title is required.");
      return;
    }
    setIsSaving(true);
    setSaveError("");
    try {
      const result = await savePostAction({
        id: initialPost?.id,
        title,
        status,
        body: blocks,
      });
      setIsDirty(false);
      // New post: redirect to its edit page now that it has an id
      if (!initialPost?.id && result?.id) {
        router.push(`/admin/blog/${result.id}`);
      }
    } catch {
      setSaveError("Save failed. Check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="post-editor">
      <div className="post-editor-header">
        <input
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="Post title"
          className="title-input"
        />
        <div className="save-controls">
          {isDirty && !isSaving && (
            <span className="unsaved-indicator" role="status">
              ● Unsaved changes
            </span>
          )}
          {isSaving && (
            <span className="saving-indicator" role="status">
              Saving…
            </span>
          )}
          <button onClick={handleSave} disabled={isSaving || !isDirty}>
            {isSaving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {saveError && <p role="alert" className="error-text">{saveError}</p>}

      <label className="status-select">
        Status
        <select value={status} onChange={(e) => updateStatus(e.target.value as Post["status"])}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>

      <BlockList blocks={blocks} onUpdate={updateBlock} onRemove={removeBlock} onMove={moveBlock} />
      <AddBlockMenu onAdd={addBlock} />
    </div>
  );
}
