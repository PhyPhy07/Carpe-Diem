"use client";

import { useEffect } from "react";
import { updateDisplayName } from "@/lib/actions/user";
import { STORAGE_KEY } from "./display-name-pre-login";

export function DisplayNameSync() {
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored?.trim()) return;

    const name = stored.trim();
    updateDisplayName(name).then(() => {
      localStorage.removeItem(STORAGE_KEY);
    });
  }, []);

  return null;
}
