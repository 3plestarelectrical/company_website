"use server";

import { auth } from "@/lib/auth";
import { createPost, updatePost } from "@/lib/posts";
import { slugify } from "@/lib/blocks";
import type { Post } from "@/types/blocks";
import { revalidatePath } from "next/cache";

type SavePostInput = Post & { id?: string };

export async function savePostAction(input: SavePostInput) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  if (input.id) {
    const updated = await updatePost(input.id, input);
    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${updated.slug}`);
    return { id: updated.id };
  }

  const slug = slugify(input.title) || `post-${Date.now()}`;
  const created = await createPost({ ...input, slug });
  revalidatePath("/admin/blog");
  return { id: created.id };
}
