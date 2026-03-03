"use server"

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function addTodo(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/?error=not_authenticated");
  }

  const statusRaw = formData.get("status") as string;
  const status =
    statusRaw === "in_progress" || statusRaw === "done" ? statusRaw : "todo";
  const title = formData.get("task") as string;
  const due_at = formData.get("due_at") as string | null;

  const { error } = await supabase.from("todos").insert({
    user_id: user.id,
    title,
    status,
    due_at: due_at || null,
  });

  if (error) {
    redirect(`/?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/?success=1");
}