"use client";

import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onClick: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

export function DeleteButton({
  onClick,
  disabled,
  "aria-label": ariaLabel = "Delete task",
}: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="flex shrink-0 items-center justify-center rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <Trash2 className="size-5" />
    </button>
  );
}
