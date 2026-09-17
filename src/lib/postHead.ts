import { supabase } from "@/integrations/supabase/client";

export type PostMeta = {
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  updated_at?: string | null;
};

const SITE = "https://charleshsieh.com";

export async function fetchPostMeta(slug: string): Promise<PostMeta | null> {
  try {
    const { data } = await supabase
      .from("posts")
      .select("title, excerpt, cover_image_url, published_at, updated_at")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return (data as PostMeta | null) ?? null;
  } catch {
    return null;
  }
}

function clamp(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : clean.slice(0, max - 1).trimEnd() + "…";
}

export function buildPostHead({
  slug,
  post,
  base,
  fallbackTitle,
  fallbackDescription,
}: {
  slug: string;
  post: PostMeta | null;
  base: "blog" | "travel";
  fallbackTitle: string;
  fallbackDescription: string;
}) {
  const url = `${SITE}/${base}/${slug}`;
  const title = post?.title ? `${post.title} — Charles Hsieh` : fallbackTitle;
  const description = post?.excerpt ? clamp(post.excerpt) : fallbackDescription;
  const image =
    post?.cover_image_url && /^https:\/\//.test(post.cover_image_url)
      ? post.cover_image_url
      : null;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post?.title ?? fallbackTitle,
          description,
          mainEntityOfPage: url,
          url,
          ...(image ? { image } : {}),
          ...(post?.published_at ? { datePublished: post.published_at } : {}),
          ...(post?.updated_at ? { dateModified: post.updated_at } : {}),
          author: {
            "@type": "Person",
            name: "Charles Hsieh",
            url: SITE,
          },
          publisher: {
            "@type": "Person",
            name: "Charles Hsieh",
            url: SITE,
          },
        }),
      },
    ],
  };
}
