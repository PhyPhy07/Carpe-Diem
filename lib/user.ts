import type { User } from "@supabase/supabase-js";

export function getDisplayName(user: User | null): string | null {
  if (!user) return null;
  return (
    user.user_metadata?.display_name ??
    user.user_metadata?.name ??
    user.user_metadata?.user_name ??
    user.user_metadata?.login ??
    user.user_metadata?.full_name ??
    user.email ??
    null
  );
}
