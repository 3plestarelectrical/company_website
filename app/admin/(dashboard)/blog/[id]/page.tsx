import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/blog-editor/PostEditor";

type Params = Promise<{ id: string }>;

export default async function EditPostPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  return (
    <PostEditor
      key={id}
      initialPost={{
        id: post.id,
        title: post.title,
        status: post.status,
        body: post.body,
        cover_image: post.cover_image,
      }}
    />
  );
}