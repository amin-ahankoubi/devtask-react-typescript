import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onSave: (id: number, title: string) => void;
  onStatusChange: (id: number, status: Task['status']) => void;
  onPriorityChange: (id: number, priority: Task['priority']) => void;
}

function TaskList({
  tasks,
  onDelete,
  onSave,
  onStatusChange,
  onPriorityChange,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          No tasks yet
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Create your first task to get started.
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onSave={onSave}
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </ul>
  )
}

export default TaskList;