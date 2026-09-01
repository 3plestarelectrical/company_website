"use client";

import type { Block } from "@/types/blocks";
import BlockEditor from "./BlockEditor";

type Props = {
  blocks: Block[];
  onUpdate: (id: string, updated: Block) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
};

export default function BlockList({ blocks, onUpdate, onRemove, onMove }: Props) {
  if (blocks.length === 0) {
    return <p className="empty-state">No content blocks yet. Add one below.</p>;
  }

  return (
    <div className="block-list">
      {blocks.map((block, index) => (
        <div key={block.id} className="block-row">
          <div className="block-controls">
            <button
              type="button"
              aria-label="Move block up"
              disabled={index === 0}
              onClick={() => onMove(block.id, "up")}
            >
              ↑
            </button>
            <button
              type="button"
              aria-label="Move block down"
              disabled={index === blocks.length - 1}
              onClick={() => onMove(block.id, "down")}
            >
              ↓
            </button>
            <button
              type="button"
              aria-label="Delete block"
              className="delete-btn"
              onClick={() => {
                if (window.confirm("Delete this block?")) onRemove(block.id);
              }}
            >
              ✕
            </button>
          </div>
          <div className="block-content">
            <BlockEditor block={block} onChange={(updated) => onUpdate(block.id, updated)} />
          </div>
        </div>
      ))}
    </div>
  );
}
