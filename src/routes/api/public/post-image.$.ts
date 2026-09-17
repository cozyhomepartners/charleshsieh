import { createFileRoute } from "@tanstack/react-router";

const SAFE_PATH = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/;

async function isAdminRequest(request: Request): Promise<boolean> {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token || token.split(".").length !== 3) return false;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return false;
  const { data: role } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id)
    .eq("role", "admin")
    .maybeSingle();
  return Boolean(role);
}

async function belongsToPublishedPost(path: string): Promise<boolean> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("posts")
    .select("id")
    .eq("published", true)
    .or(`cover_image_url.like.%${path}%,content.like.%${path}%`)
    .limit(1);
  return (data?.length ?? 0) > 0;
}

export const Route = createFileRoute("/api/public/post-image/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        if (!path || path.includes("..") || !SAFE_PATH.test(path)) {
          return new Response("Not found", { status: 404 });
        }

        const allowed =
          (await belongsToPublishedPost(path)) || (await isAdminRequest(request));
        if (!allowed) return new Response("Not found", { status: 404 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("post-images").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });

        return new Response(data, {
          headers: {
            "Content-Type": data.type || "application/octet-stream",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
