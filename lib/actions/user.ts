"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateDisplayName(displayName: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const trimmed = displayName.trim();
  await supabase.auth.updateUser({
    data: { display_name: trimmed || null },
  });

  revalidatePath("/");
}
