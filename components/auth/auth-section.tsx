import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import { SignInButton } from "./sign-in-button";
import { SignOutButton } from "./sign-out-button";

interface AuthSectionProps {
  user: User | null;
}

export function AuthSection({ user }: AuthSectionProps) {
  if (user) {
    const displayName =
      user.user_metadata?.name ??
      user.user_metadata?.user_name ??
      user.user_metadata?.login ??
      user.user_metadata?.full_name ??
      user.email ??
      "Signed in";

    return (
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Signed in as <span className="font-medium text-zinc-900 dark:text-zinc-50">{displayName}</span>
        </p>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src="/super.svg"
        alt=""
        width={120}
        height={120}
        className="object-contain"
      />
      <SignInButton />
    </div>
  );
}
