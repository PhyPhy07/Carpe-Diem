"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function WelcomeSound() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("welcome") !== "1") return;
    new Audio("/welcome-home-from-jarvis.mp3").play().catch(() => {});
    window.history.replaceState(null, "", "/");
  }, [searchParams]);

  return null;
}
