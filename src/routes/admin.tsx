import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { RichTextEditor } from "@/components/RichTextEditor";

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
  category: "travel" | "writing";
  location: string;
  cover_image_url: string;
  published: boolean;
};

const emptyDraft: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "writing",
  location: "",
  cover_image_url: "",
  published: false,
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

const pickFile = () =>
  new Promise<File | null>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => resolve(input.files?.[0] ?? null);
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
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleCoverUpload = async () => {
    const file = await pickFile();
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);
    if (url) setDraft((d) => ({ ...d, cover_image_url: url }));
  };

  const handleInlineUpload = async () => {
    const file = await pickFile();
    if (!file) return null;
    return uploadImage(file);
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
          <Field label="Cover photo (optional)">
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <input
                value={draft.cover_image_url}
                onChange={(e) => setDraft((d) => ({ ...d, cover_image_url: e.target.value }))}
                placeholder="Upload a photo or paste a URL"
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
            </div>
            {draft.cover_image_url ? (
              <img
                src={draft.cover_image_url}
                alt="Cover preview"
                className="mt-3 h-44 w-full rounded-xl object-cover"
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
              onRequestImage={handleInlineUpload}
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

        <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight">Your posts</h2>
        <div className="mt-5 divide-y divide-border border-y border-border">
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
