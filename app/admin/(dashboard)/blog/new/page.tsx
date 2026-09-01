import PostEditor from "@/components/admin/blog-editor/PostEditor";

export default function NewPostPage() {
  // key="new" keeps this a distinct component instance from any [id] editor
  return <PostEditor key="new" />;
}
