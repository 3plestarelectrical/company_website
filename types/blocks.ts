type BlockBase = {
  id: string;
};

export type HeadingBlock = BlockBase & {
  type: "heading";
  level: 2 | 3;
  text: string;
};

export type ParagraphBlock = BlockBase & {
  type: "paragraph";
  text: string; // supports simple **bold** / *italic* markdown, parsed at render time
};

export type ImageBlock = BlockBase & {
  type: "image";
  url: string;
  alt: string;
  caption?: string;
};

export type ListBlock = BlockBase & {
  type: "list";
  style: "bullet" | "numbered";
  items: string[];
};

export type QuoteBlock = BlockBase & {
  type: "quote";
  text: string;
  attribution?: string;
};

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock
  | QuoteBlock;

export type PostBody = Block[];

export type Post = {
  id?: string;
  title: string;
  slug?: string;
  status: "draft" | "published";
  body: Block[];
  cover_image?: string | null;
};
