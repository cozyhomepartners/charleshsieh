import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Write a post — Charles Hsieh" },
      { name: "description", content: "Private editor for posts on charleshsieh.com." },
      { property: "og:title", content: "Write a post — Charles Hsieh" },
      { property: "og:description", content: "Private editor for posts on charleshsieh.com." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Draft = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image_url: string;
  published: boolean;
};

const emptyDraft: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Writing",
  cover_image_url: "",
  published: false,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAdmin, loading } = useAuth();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const { data: posts } = useQuery({
    queryKey: ["posts", "all"],
    enabled: Boolean(user) && isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const save = async (publish: boolean) => {
    if (!user) return;
    if (!draft.title.trim()) { toast.error("Give the post a title."); return; }
    const slug = draft.slug.trim() || slugify(draft.title);
    setSaving(true);
    const payload = {
      title: draft.title,
      slug,
      excerpt: draft.excerpt,
      content: draft.content,
      category: draft.category || "Writing",
      cover_image_url: draft.cover_image_url || null,
      published: publish,
      published_at: publish ? new Date().toISOString() : null,
      author_id: user.id,
    };
    const { error } = draft.id
      ? await supabase.from("posts").update(payload).eq("id", draft.id)
      : await supabase.from("posts").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(publish ? "Published." : "Draft saved.");
    setDraft(emptyDraft);
    void queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Post deleted.");
    void queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  if (loading) {
    return <div className="min-h-screen bg-background p-10 text-muted-foreground">Loading…</div>;
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-background px-5 py-16 text-foreground">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8">
          <h1 className="font-display text-2xl font-semibold">You're signed in</h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            This account doesn't have publishing access yet. Ask Charles to grant your
            account author access, then reload this page.
          </p>
          <button
            type="button"
            onClick={() => void supabase.auth.signOut()}
            className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary">
            &larr; Back to the site
          </Link>
          <button
            type="button"
            onClick={() => void supabase.auth.signOut().then(() => navigate({ to: "/" }))}
            className="text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            Sign out
          </button>
        </div>

        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {draft.id ? "Edit post" : "New post"}
        </h1>

        <div className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-7">
          <Field label="Title">
            <input
              value={draft.title}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  title: e.target.value,
                  slug: d.id ? d.slug : slugify(e.target.value),
                }))
              }
              className={inputClass}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="URL slug">
              <input
                value={draft.slug}
                onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
                className={inputClass}
              />
            </Field>
            <Field label="Category">
              <input
                value={draft.category}
                onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                placeholder="Travel, Writing, Building…"
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Cover image URL (optional)">
            <input
              value={draft.cover_image_url}
              onChange={(e) => setDraft((d) => ({ ...d, cover_image_url: e.target.value }))}
              className={inputClass}
            />
          </Field>
          <Field label="Excerpt">
            <textarea
              rows={2}
              value={draft.excerpt}
              onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))}
              className={inputClass}
            />
          </Field>
          <Field label="Post">
            <textarea
              rows={16}
              value={draft.content}
              onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
              placeholder="Write here. Leave a blank line between paragraphs."
              className={inputClass}
            />
          </Field>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => void save(true)}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              Publish
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void save(false)}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary disabled:opacity-60"
            >
              Save as draft
            </button>
            {draft.id ? (
              <button
                type="button"
                onClick={() => setDraft(emptyDraft)}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:text-primary"
              >
                Cancel edit
              </button>
            ) : null}
          </div>
        </div>

        <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight">Your posts</h2>
        <div className="mt-5 divide-y divide-border border-y border-border">
          {(posts ?? []).map((post) => (
            <div key={post.id} className="flex flex-wrap items-center gap-3 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-semibold">{post.title}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {post.published ? "Published" : "Draft"} · /{post.slug}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setDraft({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt ?? "",
                    content: post.content ?? "",
                    category: post.category ?? "Writing",
                    cover_image_url: post.cover_image_url ?? "",
                    published: post.published,
                  })
                }
                className="text-sm font-semibold hover:text-primary"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => void remove(post.id)}
                className="text-sm font-semibold text-muted-foreground hover:text-destructive"
              >
                Delete
              </button>
            </div>
          ))}
          {posts && posts.length === 0 ? (
            <p className="py-4 text-muted-foreground">Nothing written yet.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
