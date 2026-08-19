import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PostCard, type Post } from "@/components/PostArticle";

const title = "Travel notes — Charles Hsieh";
const description =
  "Trip journals and photos from Charles Hsieh: family travel, slow mornings, long drives, and the places worth going back to.";

export const Route = createFileRoute("/travel/")({
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
    links: [{ rel: "canonical", href: "https://charleshsieh.com/travel" }],
  }),
  component: TravelIndex,
});

function TravelIndex() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", "published", "travel"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, content, category, location, cover_image_url, published_at, tags")
        .eq("published", true)
        .eq("category", "travel")
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
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Travel notes</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Where we went, what it cost us in sleep, and what we'd do again. Mostly with two
          kids in tow.
        </p>

        {isLoading ? (
          <p className="mt-10 text-muted-foreground">Loading…</p>
        ) : !posts || posts.length === 0 ? (
          <p className="mt-10 text-muted-foreground">No travel notes published yet.</p>
        ) : (
          <div className="mt-10 space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} to="/travel/$slug" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
