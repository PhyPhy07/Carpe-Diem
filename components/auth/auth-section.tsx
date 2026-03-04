import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import { getDisplayName } from "@/lib/user";
import { DisplayNamePreLogin } from "./display-name-pre-login";
import { EmailPasswordAuth } from "./email-password-auth";
import { SignInButton } from "./sign-in-button";
import { SignOutButton } from "./sign-out-button";

interface AuthSectionProps {
  user: User | null;
}

export function AuthSection({ user }: AuthSectionProps) {
  if (user) {
    const displayName = getDisplayName(user);

    return (
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Signed in as <span className="font-medium text-zinc-900 dark:text-zinc-50">{displayName ?? user.email ?? "Signed in"}</span>
        </p>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Image
        src="/super.svg"
        alt=""
        width={120}
        height={120}
        className="object-contain"
      />
      <div className="flex w-full flex-col items-center gap-4">
        <DisplayNamePreLogin />
        <SignInButton />
        <div className="flex w-full max-w-md items-center gap-3">
          <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-600" />
          <span className="text-sm text-zinc-500">or</span>
          <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-600" />
        </div>
        <EmailPasswordAuth />
      </div>
    </div>
  );
}
