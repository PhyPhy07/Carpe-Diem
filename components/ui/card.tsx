import * as React from "react"

import { cn } from "@/lib/utils"
import { addTodo } from "@/lib/actions/todo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

function CardDemo() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Add a New Task</CardTitle>
      
      </CardHeader>
      <CardContent>
        <form action={addTodo}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="task">What chu need to do?</Label>
              <Input
                id="task"
                name="task"
                type="text"
                placeholder="Enter your task here"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due_at">Due date & time</Label>
              <Input
                id="due_at"
                name="due_at"
                type="datetime-local"
                className="w-full"
              />
            </div>  
            <Button type="submit" className="w-full">
              Add Task
            </Button>
            <Button variant="outline" type="button" className="w-full">
              Cancel
            </Button>
          </div>
          </form>
        </CardContent>
      </Card>
  )
}

export { CardDemo }
