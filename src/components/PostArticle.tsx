import { Link } from "@tanstack/react-router";
import { MapPin, Pencil } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { sanitizeHtml, isHtmlContent, countImages } from "@/lib/sanitizeHtml";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  location?: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  tags?: string[] | null;
};

export function TagPills({ tags, tone = "warm" }: { tags?: string[] | null; tone?: "warm" | "onImage" }) {
  if (!tags || tags.length === 0) return null;
  const palette = [
    "bg-primary/12 text-primary",
    "bg-marigold/25 text-foreground",
    "bg-teal/15 text-teal",
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={tag}
          className={
            "inline-block rounded-full px-3 py-1 text-xs font-semibold " +
            (tone === "onImage" ? "bg-background/90 text-foreground" : palette[i % palette.length])
          }
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }) : "";

function Body({ post }: { post: Post }) {
  const images = countImages(post.content);
  const classes = [
    "post-body",
    images >= 3 ? "post-body--gallery" : "",
    post.cover_image_url ? "" : "post-body--dropcap",
  ]
    .filter(Boolean)
    .join(" ");

  if (isHtmlContent(post.content)) {
    return <div className={classes} dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} />;
  }
  return (
    <div className={classes}>
      {post.content.split(/\n{2,}/).map((para, i) => (
        <p key={i} className="whitespace-pre-line">
          {para}
        </p>
      ))}
    </div>
  );
}

function RelatedPosts({ post }: { post: Post }) {
  const { data } = useQuery({
    queryKey: ["related-posts", post.slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .neq("slug", post.slug)
        .order("published_at", { ascending: false })
        .limit(12);
      if (error) throw error;
      return (data ?? []) as Post[];
    },
  });

  const all = data ?? [];
  const same = all.filter((p) => p.category === post.category);
  const others = all.filter((p) => p.category !== post.category);
  const related = [...same, ...others].slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl font-semibold tracking-tight">Keep reading</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {related.map((p) => (
          <PostCard key={p.id} post={p} to={p.category === "travel" ? "/travel/$slug" : "/blog/$slug"} />
        ))}
      </div>
    </section>
  );
}

function PostFooter({ post }: { post: Post }) {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
      <div className="rounded-3xl border border-border bg-card p-7">
        <p className="font-display text-xl font-semibold tracking-tight">Charles Hsieh</p>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Dad, husband, traveler, and a builder who can't sit still. I write here about the road,
          the family, and whatever I'm making next.
        </p>
        <a
          href="mailto:hello@charleshsieh.com"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Say hello
        </a>
      </div>

      <RelatedPosts post={post} />

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/travel"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary"
        >
          All travel notes
        </Link>
        <Link
          to="/blog"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary"
        >
          All blog posts
        </Link>
        <Link
          to="/"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

export function PostArticle({ post, backTo, backLabel }: { post: Post; backTo: "/blog" | "/travel"; backLabel: string }) {
  const isTravel = post.category === "travel";
  const hasCover = Boolean(post.cover_image_url);
  const { isAdmin } = useAuth();
  const canEdit = isAdmin && post.id !== "preview";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {hasCover ? (
        <header className="relative">
          <img
            src={post.cover_image_url!}
            alt={post.title}
            className="h-[46vh] min-h-72 w-full object-cover sm:h-[62vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-5 pb-10 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/90">
              {isTravel ? "Travel" : "Blog"}
              {post.published_at ? " · " + formatDate(post.published_at) : ""}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-background sm:text-6xl">
              {post.title}
            </h1>
            {post.location ? (
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-background/90">
                <MapPin className="h-4 w-4" />
                {post.location}
              </p>
            ) : null}
            {post.tags && post.tags.length ? (
              <div className="mt-4">
                <TagPills tags={post.tags} tone="onImage" />
              </div>
            ) : null}
          </div>
        </header>
      ) : null}

      <article className={"mx-auto max-w-3xl px-5 sm:px-8 " + (hasCover ? "pt-10 pb-16" : "py-14")}>
        <Link to={backTo} className="text-sm font-semibold text-muted-foreground hover:text-primary">
          &larr; {backLabel}
        </Link>

        {!hasCover ? (
          <>
            <p className={"mt-8 text-xs font-semibold uppercase tracking-[0.2em] " + (isTravel ? "text-marigold-ink" : "text-primary")}>
              {isTravel ? "Travel" : "Blog"}
              {post.published_at ? " · " + formatDate(post.published_at) : ""}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            {post.location ? (
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {post.location}
              </p>
            ) : null}
            {post.tags && post.tags.length ? (
              <div className="mt-4">
                <TagPills tags={post.tags} />
              </div>
            ) : null}
          </>
        ) : null}

        {post.excerpt ? (
          <p className="mt-6 border-l-2 border-primary/40 pl-4 font-display text-xl italic leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-9">
          <Body post={post} />
        </div>
      </article>
    </div>
  );
}

export function PostCard({ post, to }: { post: Post; to: "/blog/$slug" | "/travel/$slug" }) {
  const isTravel = post.category === "travel";
  return (
    <Link
      to={to}
      params={{ slug: post.slug }}
      className="group block overflow-hidden rounded-3xl border border-border bg-card transition-transform duration-200 hover:-translate-y-1"
    >
      {post.cover_image_url ? (
        <img src={post.cover_image_url} alt={post.title} loading="lazy" className="h-56 w-full object-cover" />
      ) : null}
      <div className="space-y-2 p-7">
        <p className={"text-xs font-semibold uppercase tracking-[0.16em] " + (isTravel ? "text-marigold-ink" : "text-primary")}>
          {post.location ?? (isTravel ? "Travel" : "Blog")}
          {post.published_at ? " · " + formatDate(post.published_at) : ""}
        </p>
        <h2 className="font-display text-2xl font-semibold tracking-tight group-hover:text-primary">{post.title}</h2>
        {post.excerpt ? <p className="leading-relaxed text-muted-foreground">{post.excerpt}</p> : null}
        {post.tags && post.tags.length ? (
          <div className="pt-1">
            <TagPills tags={post.tags} />
          </div>
        ) : null}
      </div>
    </Link>
  );
}
