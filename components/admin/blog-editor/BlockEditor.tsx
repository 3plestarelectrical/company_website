import type { Block } from "@/types/blocks";
import HeadingBlockEditor from "./blocks/HeadingBlockEditor";
import ParagraphBlockEditor from "./blocks/ParagraphBlockEditor";
import ImageBlockEditor from "./blocks/ImageBlockEditor";
import ListBlockEditor from "./blocks/ListBlockEditor";
import QuoteBlockEditor from "./blocks/QuoteBlockEditor";

type Props = {
  block: Block;
  onChange: (block: Block) => void;
};

export default function BlockEditor({ block, onChange }: Props) {
  switch (block.type) {
    case "heading":
      return <HeadingBlockEditor block={block} onChange={onChange as (b: typeof block) => void} />;
    case "paragraph":
      return <ParagraphBlockEditor block={block} onChange={onChange as (b: typeof block) => void} />;
    case "image":
      return <ImageBlockEditor block={block} onChange={onChange as (b: typeof block) => void} />;
    case "list":
      return <ListBlockEditor block={block} onChange={onChange as (b: typeof block) => void} />;
    case "quote":
      return <QuoteBlockEditor block={block} onChange={onChange as (b: typeof block) => void} />;
  }
}
