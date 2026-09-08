import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onSave: (id: number, title: string) => void;
}

function TaskList({ tasks, onDelete, onSave }: TaskListProps) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onSave={onSave}
        />
      ))}
    </ul>
  )
}

export default TaskList;