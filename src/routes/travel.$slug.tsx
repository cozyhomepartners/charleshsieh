import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PostArticle, type Post } from "@/components/PostArticle";

export const Route = createFileRoute("/travel/$slug")({
  head: ({ params }) => {
    const title = "Travel note — Charles Hsieh";
    const description = "A travel note from Charles Hsieh.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "https://charleshsieh.com/travel/" + params.slug }],
    };
  },
  component: TravelPost,
});

function TravelPost() {
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
        This note doesn't exist or isn't published.
      </div>
    );
  }
  return <PostArticle post={post} backTo="/travel" backLabel="All travel notes" />;
}
