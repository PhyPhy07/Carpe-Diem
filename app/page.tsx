import { createClient } from "@/lib/supabase/server";
import { AuthSection } from "@/components/auth/auth-section";
import { getRandomMotivate } from "@/lib/motivate";
import { CardDemo } from "@/components/ui/card";
import { TodoListCard, type Todo } from "@/components/todo-list-card";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const timeOfDay = new Date().getHours();

  const greeting =
    timeOfDay < 12 ? "Good Morning" : timeOfDay < 18 ? "Good Afternoon" : "Good Evening";
  const displayName =
    user?.user_metadata?.name ??
    user?.user_metadata?.user_name ??
    user?.user_metadata?.login ??
    user?.user_metadata?.full_name ??
    user?.email ??
    null;
  let todos: Todo[] = [];
  if (user) {
    const { data } = await supabase
      .from("todos")
      .select("id, title, status, due_at, priority")
      .order("created_at", { ascending: false });
    const raw = data ?? [];
    todos = [...raw].sort((a, b) => {
      const aDue = a.due_at ? new Date(a.due_at).getTime() : Infinity;
      const bDue = b.due_at ? new Date(b.due_at).getTime() : Infinity;
      return aDue - bDue;
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {user && displayName ? `${greeting}, ${displayName}!` : "Carpe Diem"}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {user ? getRandomMotivate() : "Sign in with GitHub to get started."}
          </p>
        </div>

        <div className="flex w-full flex-col gap-6">
          <CardDemo />
          {user && <TodoListCard todos={todos} />}
        </div>
        <div className="flex w-full flex-col gap-4 text-base font-medium md:flex-row">
          <AuthSection user={user} />
        </div>
      </main>
    </div>
  );
}
