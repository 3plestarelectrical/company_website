import type { ListBlock } from "@/types/blocks";

type Props = {
  block: ListBlock;
  onChange: (block: ListBlock) => void;
};

export default function ListBlockEditor({ block, onChange }: Props) {
  function updateItem(index: number, value: string) {
    const items = [...block.items];
    items[index] = value;
    onChange({ ...block, items });
  }
  function addItem() {
    onChange({ ...block, items: [...block.items, ""] });
  }
  function removeItem(index: number) {
    onChange({ ...block, items: block.items.filter((_, i) => i !== index) });
  }

  return (
    <div className="block-editor block-editor-list">
      <select
        aria-label="List style"
        value={block.style}
        onChange={(e) => onChange({ ...block, style: e.target.value as "bullet" | "numbered" })}
      >
        <option value="bullet">Bullet list</option>
        <option value="numbered">Numbered list</option>
      </select>

      {block.items.map((item, i) => (
        <div key={i} className="list-item-row">
          <input
            type="text"
            value={item}
            placeholder={`Item ${i + 1}`}
            onChange={(e) => updateItem(i, e.target.value)}
          />
          <button type="button" aria-label="Remove item" onClick={() => removeItem(i)}>
            ✕
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem}>
        + Add item
      </button>
    </div>
  );
}
