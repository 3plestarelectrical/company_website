import type { HeadingBlock } from "@/types/blocks";

type Props = {
  block: HeadingBlock;
  onChange: (block: HeadingBlock) => void;
};

export default function HeadingBlockEditor({ block, onChange }: Props) {
  return (
    <div className="block-editor block-editor-heading">
      <select
        aria-label="Heading level"
        value={block.level}
        onChange={(e) => onChange({ ...block, level: Number(e.target.value) as 2 | 3 })}
      >
        <option value={2}>Heading (large)</option>
        <option value={3}>Heading (small)</option>
      </select>
      <input
        type="text"
        value={block.text}
        placeholder="Heading text"
        onChange={(e) => onChange({ ...block, text: e.target.value })}
      />
    </div>
  );
}
