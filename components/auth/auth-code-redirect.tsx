"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * When Supabase redirects with auth params to / or /auth/reset-password instead of /auth/callback,
 * redirect to the callback route so the session can be exchanged.
 * Handles: ?code=xxx (OAuth) and ?token_hash=xxx&type=xxx (email verification, password reset)
 */
const AUTH_REDIRECT_PATHS = ["/", "/auth/reset-password"];

export function AuthCodeRedirect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!AUTH_REDIRECT_PATHS.includes(pathname)) return;

    const code = searchParams.get("code");
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    if (code) {
      const next = pathname === "/auth/reset-password" ? "/auth/reset-password" : (searchParams.get("next") ?? "");
      window.location.replace(`/auth/callback?code=${code}${next ? `&next=${encodeURIComponent(next)}` : ""}`);
      return;
    }

    if (token_hash && type) {
      const params = new URLSearchParams({ token_hash, type });
      const next = pathname === "/auth/reset-password" ? "/auth/reset-password" : searchParams.get("next");
      if (next) params.set("next", next);
      window.location.replace(`/auth/callback?${params.toString()}`);
    }
  }, [pathname, searchParams]);

  return null;
}
