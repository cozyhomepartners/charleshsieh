import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { RichTextEditor } from "@/components/RichTextEditor";
import { PostArticle, type Post } from "@/components/PostArticle";

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
  validateSearch: (search: Record<string, unknown>): { edit?: string } => {
    const edit = search['edit'];
    return typeof edit === "string" && edit ? { edit } : {};
  },
  component: AdminPage,
});

type Draft = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "travel" | "writing";
  location: string;
  cover_image_url: string;
  tags: string;
  published: boolean;
  published_at: string;
};

const toISOFromDateInput = (value: string) => {
  const d = new Date(`${value}T12:00:00`);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
};

const toDateInput = (iso: string | null | undefined) => {
  const parsed = iso ? new Date(iso) : new Date();
  const d = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const emptyDraft: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "writing",
  location: "",
  cover_image_url: "",
  tags: "",
  published: false,
  published_at: toDateInput(null),
};


const uploadImage = async (file: File): Promise<string | null> => {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("post-images").upload(path, file, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) {
    toast.error(error.message);
    return null;
  }
  return `/api/public/post-image/${path}`;
};

const pickFiles = (multiple = false) =>
  new Promise<File[]>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = multiple;
    input.onchange = () => resolve(Array.from(input.files ?? []));
    input.click();
  });

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAdmin, loading } = useAuth();
  const { edit: editId } = Route.useSearch();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<"posts" | "edit" | "preview">(editId ? "edit" : "posts");

  const parseTags = (value: string) =>
    value.split(",").map((t) => t.trim()).filter(Boolean);

  const previewPost: Post = {
    id: draft.id ?? "preview",
    title: draft.title || "Untitled post",
    slug: draft.slug || "preview",
    excerpt: draft.excerpt,
    content: draft.content,
    category: draft.category,
    location: draft.location || null,
    cover_image_url: draft.cover_image_url || null,
    published_at: toISOFromDateInput(draft.published_at),
    tags: parseTags(draft.tags),
  };

  const handleCoverUpload = async () => {
    const [file] = await pickFiles(false);
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);
    if (url) setDraft((d) => ({ ...d, cover_image_url: url }));
  };

  const handleInlineUpload = async () => {
    const files = await pickFiles(true);
    if (!files.length) return [];
    const urls: string[] = [];
    let failed = 0;
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
      else failed += 1;
    }
    if (failed) toast.error(`${failed} photo${failed > 1 ? "s" : ""} couldn't be uploaded.`);
    return urls;
  };

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
      category: draft.category,
      location: draft.location || null,
      tags: parseTags(draft.tags),
      cover_image_url: draft.cover_image_url || null,
      published: publish,
      published_at: publish ? toISOFromDateInput(draft.published_at) : null,
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

  useEffect(() => {
    if (!editId || !posts) return;
    const post = posts.find((p) => p.id === editId);
    if (!post) return;
    setTab("edit");
    setDraft({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      category: (post.category === "travel" ? "travel" : "writing") as Draft["category"],
      location: post.location ?? "",
      tags: (post.tags ?? []).join(", "),
      cover_image_url: post.cover_image_url ?? "",
      published: post.published,
      published_at: toDateInput(post.published_at),

    });
    window.scrollTo({ top: 0 });
  }, [editId, posts]);

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
          <div className="flex items-center gap-4">
            <button
            type="button"
            onClick={() => void supabase.auth.signOut().then(() => navigate({ to: "/" }))}
            className="text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            Sign out
          </button>
          </div>
        </div>

        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {tab === "posts" ? "Your posts" : draft.id ? "Edit post" : "New post"}
        </h1>

        <div className="mt-6 flex gap-1 rounded-full border border-border bg-card p-1">
          {(["posts", "edit", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={
                "flex-1 rounded-full px-5 py-2 text-sm font-semibold transition-colors " +
                (tab === t
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary")
              }
            >
              {t === "posts" ? `Posts${posts ? ` (${posts.length})` : ""}` : t === "edit" ? "Edit" : "Live preview"}
            </button>
          ))}
        </div>

        <div className="mt-8">
        {tab === "edit" ? (
        <div className="space-y-4 rounded-3xl border border-border bg-card p-7">
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
            <Field label="Where it lives">
              <div className="mt-1 flex gap-2">
                {(["travel", "writing"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, category: value }))}
                    className={
                      "flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold capitalize transition-colors " +
                      (draft.category === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input text-muted-foreground hover:border-primary")
                    }
                  >
                    {value === "travel" ? "Travel · /travel" : "Writing · /blog"}
                  </button>
                ))}
              </div>
            </Field>
          </div>
          <Field label="Location (optional)">
            <input
              value={draft.location}
              onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
              placeholder="Lisbon, Portugal"
              className={inputClass}
            />
          </Field>
          <Field label="Tags (optional, comma separated)">
            <input
              value={draft.tags}
              onChange={(e) => setDraft((d) => ({ ...d, tags: e.target.value }))}
              placeholder="Family trip, Food &amp; wandering"
              className={inputClass}
            />
          </Field>
          <Field label="Publish date">
            <input
              type="date"
              value={draft.published_at}
              onChange={(e) => setDraft((d) => ({ ...d, published_at: e.target.value }))}
              className={inputClass}
            />
          </Field>

          <Field label="Cover photo (optional)">
            <p className="mt-1 text-xs text-muted-foreground">
              Paste an image link (https://…) or upload a photo from your computer.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <input
                type="url"
                inputMode="url"
                value={draft.cover_image_url}
                onChange={(e) => setDraft((d) => ({ ...d, cover_image_url: e.target.value.trim() }))}
                placeholder="https://example.com/photo.jpg"
                className={inputClass + " mt-0 flex-1"}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => void handleCoverUpload()}
                className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Upload"}
              </button>
              {draft.cover_image_url ? (
                <button
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, cover_image_url: "" }))}
                  className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary"
                >
                  Remove
                </button>
              ) : null}
            </div>
            {draft.cover_image_url ? (
              <img
                src={draft.cover_image_url}
                alt="Cover preview"
                className="mt-3 h-44 w-full rounded-xl object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                onLoad={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "";
                }}
              />
            ) : null}
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
            <RichTextEditor
              value={draft.content}
              onChange={(html) => setDraft((d) => ({ ...d, content: html }))}
              onRequestImages={handleInlineUpload}
              placeholder="Write here. Use the toolbar for headings, quotes, lists, and photos."
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
        ) : null}
        {tab === "preview" ? (
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="preview-pane">
              <PostArticle
                post={previewPost}
                backTo={draft.category === "travel" ? "/travel" : "/blog"}
                backLabel={draft.category === "travel" ? "All travel notes" : "All writing"}
              />
            </div>
          </div>
        ) : null}
        {tab === "posts" ? (
        <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Pick a post to edit it, or start something new.
          </p>
          <button
            type="button"
            onClick={() => { setDraft(emptyDraft); setTab("edit"); }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            New post
          </button>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {(posts ?? []).map((post) => (
            <div key={post.id} className="flex flex-wrap items-center gap-3 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-semibold">{post.title}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {post.published ? "Published" : "Draft"} · /{post.category === "travel" ? "travel" : "blog"}/{post.slug}
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
                    category: (post.category === "travel" ? "travel" : "writing") as Draft["category"],
                    location: post.location ?? "",
                    tags: (post.tags ?? []).join(", "),
                    cover_image_url: post.cover_image_url ?? "",
                    published: post.published,
                    published_at: toDateInput(post.published_at),

                  });
                  setTab("edit");
                  window.scrollTo({ top: 0 });
                }}
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
        ) : null}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  // Intentionally a <div>, not a <label>: wrapping the rich-text editor in a
  // label makes a double-click activate the first button inside it (Bold).
  return (
    <div className="block">
      <span className="text-sm font-semibold">{label}</span>
      {children}
    </div>
  );
}
