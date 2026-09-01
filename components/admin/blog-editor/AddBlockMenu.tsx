import type { Block } from "@/types/blocks";

const BLOCK_TYPES: { type: Block["type"]; label: string }[] = [
  { type: "heading", label: "Heading" },
  { type: "paragraph", label: "Paragraph" },
  { type: "image", label: "Image" },
  { type: "list", label: "List" },
  { type: "quote", label: "Quote" },
];

type Props = {
  onAdd: (type: Block["type"]) => void;
};

export default function AddBlockMenu({ onAdd }: Props) {
  return (
    <div className="add-block-menu">
      <span className="add-block-label">Add block:</span>
      {BLOCK_TYPES.map(({ type, label }) => (
        <button key={type} type="button" onClick={() => onAdd(type)}>
          + {label}
        </button>
      ))}
    </div>
  );
}
