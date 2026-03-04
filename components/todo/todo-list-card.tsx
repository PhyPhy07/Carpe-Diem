import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TodoItem } from "@/components/todo/todo-item";

export type Todo = {
  id: string;
  title: string;
  status: string;
  due_at: string | null;
  priority: boolean;
};

interface TodoListCardProps {
  todos: Todo[];
}

export function TodoListCard({ todos }: TodoListCardProps) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Let's Go:</CardTitle>
      </CardHeader>
      <CardContent>
        {todos.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks yet. Add one above!</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
