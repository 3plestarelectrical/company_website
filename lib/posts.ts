import { query, queryOne } from "@/lib/db";
import type { Block, Post } from "@/types/blocks";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  body: Block[];
  cover_image: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function listPosts(): Promise<PostRow[]> {
  return query<PostRow>(
    `select id, title, slug, body, cover_image, status, published_at, created_at, updated_at
     from posts order by updated_at desc`
  );
}

export async function listPublishedPosts(): Promise<PostRow[]> {
  return query<PostRow>(
    `select id, title, slug, body, cover_image, status, published_at, created_at, updated_at
     from posts where status = 'published' order by published_at desc`
  );
}

export async function getPost(id: string): Promise<PostRow | null> {
  return queryOne<PostRow>(`select * from posts where id = $1`, [id]);
}

export async function getPostBySlug(slug: string): Promise<PostRow | null> {
  return queryOne<PostRow>(
    `select * from posts where slug = $1 and status = 'published'`,
    [slug]
  );
}

export async function createPost(post: Post & { slug: string }): Promise<PostRow> {
  const row = await queryOne<PostRow>(
    `insert into posts (title, slug, body, cover_image, status, published_at)
     values ($1, $2, $3, $4, $5, case when $5 = 'published' then now() else null end)
     returning *`,
    [post.title, post.slug, JSON.stringify(post.body), post.cover_image ?? null, post.status]
  );
  if (!row) throw new Error("Failed to create post");
  return row;
}

export async function updatePost(id: string, post: Post): Promise<PostRow> {
  const row = await queryOne<PostRow>(
    `update posts
     set title = $2,
         body = $3,
         cover_image = $4,
         status = $5,
         published_at = case
           when $5 = 'published' and published_at is null then now()
           else published_at
         end,
         updated_at = now()
     where id = $1
     returning *`,
    [id, post.title, JSON.stringify(post.body), post.cover_image ?? null, post.status]
  );
  if (!row) throw new Error("Post not found");
  return row;
}
