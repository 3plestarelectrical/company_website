import type { Block } from "@/types/blocks";

export function createEmptyBlock(type: Block["type"]): Block {
  const id = crypto.randomUUID();
  switch (type) {
    case "heading":
      return { id, type: "heading", level: 2, text: "" };
    case "paragraph":
      return { id, type: "paragraph", text: "" };
    case "image":
      return { id, type: "image", url: "", alt: "", caption: "" };
    case "list":
      return { id, type: "list", style: "bullet", items: [""] };
    case "quote":
      return { id, type: "quote", text: "", attribution: "" };
  }
}

export function renderInlineText(raw: string): string {
  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function plainTextExcerpt(blocks: Block[], maxLen = 155): string {
  const firstParagraph = blocks.find((b) => b.type === "paragraph");
  const raw = firstParagraph && "text" in firstParagraph ? firstParagraph.text : "";
  const plain = raw.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}