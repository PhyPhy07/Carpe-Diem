"use client";

import Image from "next/image";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { updateTodoStatus, deleteTodo } from "@/lib/actions/todo";
import { DeleteButton } from "@/components/todo/delete-button";
import type { Todo } from "@/components/todo/todo-list-card";

interface TodoItemProps {
  todo: Todo;
}

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

function isPriority(priority: boolean | string | null | undefined): boolean {
  return priority === true || priority === "true";
}

function isDueSoon(dueAt: string | null, status: string): boolean {
  if (!dueAt || status === "done") return false;
  const due = new Date(dueAt).getTime();
  const now = Date.now();
  return due - now <= TWENTY_FOUR_HOURS_MS;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isPending, startTransition] = useTransition();
  const dueSoon = isDueSoon(todo.due_at, todo.status);

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    if (newStatus === "done") {
      const wantsToDelete = window.confirm(
        "Do you want to delete this task?"
      );
      startTransition(() => {
        if (wantsToDelete) {
          deleteTodo(todo.id);
        } else {
          updateTodoStatus(todo.id, "done");
        }
      });
    } else {
      startTransition(() => {
        updateTodoStatus(todo.id, newStatus);
      });
    }
  }

  function handleDelete() {
    startTransition(() => {
      deleteTodo(todo.id);
    });
  }

  return (
    <li
      className={cn(
        "flex items-center justify-between rounded-lg border px-4 py-3 transition-opacity",
        isPending && "opacity-50",
        dueSoon && "bg-red-50 dark:bg-red-950/40"
      )}
    >
      <div className="flex items-center gap-3">
        <DeleteButton onClick={handleDelete} disabled={isPending} />
        <div className="flex flex-col gap-0.5">
          <span
            className={
              todo.status === "done"
                ? "text-muted-foreground line-through"
                : "font-medium"
            }
          >
            {todo.title}
          </span>
          {todo.due_at && (
            <span className="text-xs text-muted-foreground">
              Due {format(new Date(todo.due_at), "MMM d, yyyy h:mm a")}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={todo.status}
          onChange={handleStatusChange}
          disabled={isPending}
          className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {isPriority(todo.priority) && (
          <Image
            src="/captain.svg"
            alt="High priority"
            width={20}
            height={20}
            className="shrink-0"
          />
        )}
      </div>
    </li>
  );
}
