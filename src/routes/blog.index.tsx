import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PostCard, type Post } from "@/components/PostArticle";

const title = "Writing — Charles Hsieh";
const description =
  "Essays, travel notes, and half-formed thoughts from Charles Hsieh on building, family, and life on the road.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://charleshsieh.com/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", "published", "writing"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, content, category, location, cover_image_url, published_at")
        .eq("published", true)
        .eq("category", "writing")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as Post[];
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary">
          &larr; Charles Hsieh
        </Link>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Writing
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Essays about building things, family, and whatever else I'm thinking through.
          Travel journals live over on{" "}
          <Link to="/travel" className="text-primary underline underline-offset-4">travel notes</Link>.
        </p>

        {isLoading ? (
          <p className="mt-10 text-muted-foreground">Loading posts…</p>
        ) : !posts || posts.length === 0 ? (
          <p className="mt-10 text-muted-foreground">No posts published yet. Check back soon.</p>
        ) : (
          <div className="mt-10 space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} to="/blog/$slug" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
