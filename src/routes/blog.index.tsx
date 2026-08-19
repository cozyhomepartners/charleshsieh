import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
    queryKey: ["posts", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, category, cover_image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
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
          Notes from the road, essays about building things, and whatever else I'm
          thinking through.
        </p>

        {isLoading ? (
          <p className="mt-10 text-muted-foreground">Loading posts…</p>
        ) : !posts || posts.length === 0 ? (
          <p className="mt-10 text-muted-foreground">No posts published yet. Check back soon.</p>
        ) : (
          <div className="mt-10 space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block overflow-hidden rounded-3xl border border-border bg-card transition-transform duration-200 hover:-translate-y-1"
              >
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    loading="lazy"
                    className="h-56 w-full object-cover"
                  />
                ) : null}
                <div className="space-y-2 p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {post.category}
                    {post.published_at
                      ? " · " + new Date(post.published_at).toLocaleDateString()
                      : ""}
                  </p>
                  <h2 className="font-display text-2xl font-semibold tracking-tight group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
