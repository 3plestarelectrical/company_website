type Block = {
  type: string;
  text?: string;
};

export function plainTextExcerpt(blocks: Block[], maxLen = 155): string {
  const firstParagraph = blocks.find((b) => b.type === "paragraph");
  const raw = firstParagraph?.text ?? "";
  const plain = raw.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}