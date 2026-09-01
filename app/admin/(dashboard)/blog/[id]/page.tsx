import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/blog-editor/PostEditor";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  return (
    <PostEditor
      key={params.id}
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
