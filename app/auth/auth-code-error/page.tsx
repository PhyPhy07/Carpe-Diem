import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Authentication Error
      </h1>
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        Something went wrong during sign in. Please try again.
      </p>
      <Link
        href="/"
        className="rounded-full bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Back to home
      </Link>
    </div>
  );
}
