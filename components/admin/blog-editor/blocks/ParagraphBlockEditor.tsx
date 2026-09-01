import type { ParagraphBlock } from "@/types/blocks";

type Props = {
  block: ParagraphBlock;
  onChange: (block: ParagraphBlock) => void;
};

export default function ParagraphBlockEditor({ block, onChange }: Props) {
  return (
    <div className="block-editor block-editor-paragraph">
      <textarea
        value={block.text}
        placeholder="Write a paragraph. Use **bold** and *italic* for emphasis."
        rows={4}
        onChange={(e) => onChange({ ...block, text: e.target.value })}
      />
      <p className="block-hint">Tip: **bold** and *italic* render as formatted text.</p>
    </div>
  );
}
