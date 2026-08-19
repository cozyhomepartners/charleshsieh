import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const title = "Post — Charles Hsieh";
    const description = "An essay or travel note from Charles Hsieh.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "https://charleshsieh.com/blog/" + params.slug }],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <Link to="/blog" className="text-sm font-semibold text-muted-foreground hover:text-primary">
          &larr; All writing
        </Link>
        {isLoading ? (
          <p className="mt-10 text-muted-foreground">Loading…</p>
        ) : !post ? (
          <p className="mt-10 text-muted-foreground">This post doesn't exist or isn't published.</p>
        ) : (
          <>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {post.category}
              {post.published_at ? " · " + new Date(post.published_at).toLocaleDateString() : ""}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            {post.cover_image_url ? (
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="mt-8 w-full rounded-3xl object-cover"
              />
            ) : null}
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {post.content.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="whitespace-pre-line">{para}</p>
              ))}
            </div>
          </>
        )}
      </article>
    </div>
  );
}
