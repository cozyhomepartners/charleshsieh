import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
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

export function PostArticle({ post, backTo, backLabel }: { post: Post; backTo: "/blog" | "/travel"; backLabel: string }) {
  const isTravel = post.category === "travel";
  const hasCover = Boolean(post.cover_image_url);

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
              {isTravel ? "Travel" : "Writing"}
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
            <p className={"mt-8 text-xs font-semibold uppercase tracking-[0.2em] " + (isTravel ? "text-marigold" : "text-primary")}>
              {isTravel ? "Travel" : "Writing"}
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
        <p className={"text-xs font-semibold uppercase tracking-[0.16em] " + (isTravel ? "text-marigold" : "text-primary")}>
          {post.location ?? (isTravel ? "Travel" : "Writing")}
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
