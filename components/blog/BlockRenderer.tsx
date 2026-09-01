import type { Block } from "@/types/blocks";
import { renderInlineText } from "@/lib/blocks";

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blog-content">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return <Tag key={block.id}>{block.text}</Tag>;
          }
          case "paragraph":
            return (
              <p
                key={block.id}
                dangerouslySetInnerHTML={{ __html: renderInlineText(block.text) }}
              />
            );
          case "image":
            return (
              <figure key={block.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.url} alt={block.alt} />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          case "list": {
            const ListTag = block.style === "numbered" ? "ol" : "ul";
            return (
              <ListTag key={block.id}>
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ListTag>
            );
          }
          case "quote":
            return (
              <blockquote key={block.id}>
                <p>{block.text}</p>
                {block.attribution && <cite>— {block.attribution}</cite>}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
