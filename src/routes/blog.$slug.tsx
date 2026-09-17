import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PostArticle, type Post } from "@/components/PostArticle";
import { buildPostHead, fetchPostMeta } from "@/lib/postHead";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => fetchPostMeta(params.slug),
  head: ({ params, loaderData }) =>
    buildPostHead({
      slug: params.slug,
      post: loaderData ?? null,
      base: "blog",
      fallbackTitle: "Post — Charles Hsieh",
      fallbackDescription: "An essay from Charles Hsieh.",
    }),
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data as Post | null;
    },
  });

  if (isLoading) {
    return <div className="min-h-screen bg-background p-10 text-muted-foreground">Loading…</div>;
  }
  if (!post) {
    return (
      <div className="min-h-screen bg-background p-10 text-muted-foreground">
        This post doesn't exist or isn't published.
      </div>
    );
  }
  return <PostArticle post={post} backTo="/blog" backLabel="All writing" />;
}
