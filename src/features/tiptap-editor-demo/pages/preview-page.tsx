import { TiptapClientRenderer } from "../../tiptap-editor";
import PostHeader from "../components/post-header";
import { usePost } from "../hooks/use-post";

export default function PreviewPage() {
  const { post, isLoading } = usePost();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
        <p className="text-slate-400 animate-pulse">Loading post...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <article className="py-10 px-4 sm:px-6 flex flex-col items-center">
      <PostHeader
        title={post.title}
        author={post.author}
        createdAt={post.createdAt}
        readingTime={post.readingTime}
        cover={post.cover}
      />
      <div className="w-full lg:max-w-180">
        <TiptapClientRenderer>{post.html}</TiptapClientRenderer>
      </div>
    </article>
  );
}
