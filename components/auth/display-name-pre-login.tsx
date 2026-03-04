"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STORAGE_KEY = "carpe-diem-display-name";

export function DisplayNamePreLogin() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem(STORAGE_KEY) ?? "");
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);
    if (value.trim()) {
      localStorage.setItem(STORAGE_KEY, value.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor="display-name-pre" className="text-sm text-zinc-600 dark:text-zinc-400">
        How should we greet you?
      </Label>
      <Input
        id="display-name-pre"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleChange}
        className="h-10"
      />
    </div>
  );
}

export { STORAGE_KEY };
