import type { QuoteBlock } from "@/types/blocks";

type Props = {
  block: QuoteBlock;
  onChange: (block: QuoteBlock) => void;
};

export default function QuoteBlockEditor({ block, onChange }: Props) {
  return (
    <div className="block-editor block-editor-quote">
      <textarea
        value={block.text}
        placeholder="Quote text"
        rows={3}
        onChange={(e) => onChange({ ...block, text: e.target.value })}
      />
      <input
        type="text"
        value={block.attribution ?? ""}
        placeholder="Attribution (optional)"
        onChange={(e) => onChange({ ...block, attribution: e.target.value })}
      />
    </div>
  );
}
