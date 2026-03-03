"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * When Supabase redirects to /?code=xxx instead of /auth/callback?code=xxx,
 * redirect to the callback route so the session can be exchanged.
 */
export function AuthCodeRedirect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (pathname === "/" && code) {
      window.location.replace(`/auth/callback?code=${code}`);
    }
  }, [pathname, searchParams]);

  return null;
}
