import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Grants the signed-in user the admin role when their email is on the
// admin_emails allowlist. Runs server-side so the logic and allowlist are
// not exposed as a publicly executable database function.
export const claimAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = ((context.claims?.email as string | undefined) ?? "").toLowerCase();
    if (!email) return { isAdmin: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: allowed } = await supabaseAdmin
      .from("admin_emails")
      .select("email")
      .eq("email", email)
      .maybeSingle();
    if (!allowed) return { isAdmin: false };

    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: context.userId, role: "admin" }, { onConflict: "user_id,role" });
    if (error) throw error;
    return { isAdmin: true };
  });
