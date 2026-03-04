import { createClient } from "@/lib/supabase/server";
import { AuthSection } from "@/components/auth/auth-section";
import Image from "next/image";
import { getRandomMotivate, getSpeakerIcon } from "@/lib/motivate";
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
  const motivation = user ? getRandomMotivate() : null;
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
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/marvel.jpg')" }}
    >
      <main className="flex min-h-[calc(100vh-3rem)] w-full max-w-3xl flex-col items-center justify-between py-32 px-16 m-6 bg-amber-50 dark:bg-zinc-900 sm:items-start rounded-xl border-4 border-black dark:border-zinc-100 shadow-[6px_6px_0_0_rgba(0,0,0,0.9)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,0.2)]">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {user && displayName ? `${greeting}, ${displayName}!` : "Carpe Diem"}
          </h1>
          <div className="flex flex-col items-start gap-2">
            <div className="relative max-w-md">
              <p className="relative rounded-2xl border-2 border-black dark:border-zinc-100 bg-white dark:bg-zinc-800 px-5 py-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300 shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.2)]">
                {user && motivation ? motivation.text : "Sign in with GitHub to get started."}
              </p>
              <div
                className="absolute -bottom-2 left-8 size-0 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-white dark:border-t-zinc-800"
                aria-hidden
              />
            </div>
            {user && motivation && (
              (() => {
                const icon = getSpeakerIcon(motivation.speaker);
                if (icon.startsWith("/") || icon.startsWith("http")) {
                  return (
                    <Image
                      src={icon}
                      alt={motivation.speaker}
                      width={40}
                      height={40}
                      className="ml-4 size-10 shrink-0 object-contain"
                    />
                  );
                }
                return (
                  <span className="ml-4 flex size-10 shrink-0 items-center justify-center text-2xl" aria-label={motivation.speaker}>
                    {icon}
                  </span>
                );
              })()
            )}
          </div>
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
