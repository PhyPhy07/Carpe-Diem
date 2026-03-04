"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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
  const priority = formData.get("priority") === "true";

  const { error } = await supabase.from("todos").insert({
    user_id: user.id,
    title,
    status,
    due_at: due_at || null,
    priority,
  });

  if (error) {
    redirect(`/?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/?success=1");
}

export async function updateTodoStatus(id: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const validStatus =
    status === "todo" || status === "in_progress" || status === "done"
      ? status
      : "todo";

  await supabase
    .from("todos")
    .update({ status: validStatus })
    .eq("id", id)
    .eq("user_id", user.id);

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("todos").delete().eq("id", id).eq("user_id", user.id);
  revalidatePath("/");
}