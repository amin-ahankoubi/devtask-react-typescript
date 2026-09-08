import { useState } from "react";
import type { Task } from "../types/task";

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onSave: (id: number, title: string) => void;
}

function TaskItem({ task, onDelete, onSave }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    function saveTask() {
        const title = editedTitle.trim();

        if (title === "") return;

        onSave(task.id, title);
        setIsEditing(false);
    }

    function cancelEdit() {
        setEditedTitle(task.title);
        setIsEditing(false);
    }

    const statusLabels: Record<Task['status'], string> = {
        todo: 'To Do',
        'in-progress': 'In Progress',
        done: 'Done',
    }

    const priorityLabels: Record<Task['priority'], string> = {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
    }

    const statusClasses: Record<Task['status'], string> = {
        todo: 'bg-slate-100 text-slate-600',
        'in-progress': 'bg-blue-100 text-blue-700',
        done: 'bg-green-100 text-green-700',
    }

    const priorityClasses: Record<Task['priority'], string> = {
        low: 'bg-slate-100 text-slate-600',
        medium: 'bg-orange-100 text-orange-700',
        high: 'bg-red-100 text-red-700',
    }

    return (
        <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {isEditing ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <span className="font-semibold text-slate-500">
                        #{task.id}
                    </span>

                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(event) => setEditedTitle(event.target.value)}
                        className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2
                       text-slate-900 outline-none transition
                       focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={saveTask}
                            className="rounded-lg bg-slate-900 px-4 py-2
                         text-sm font-medium text-white transition
                         hover:bg-slate-700"
                        >
                            Save
                        </button>

                        <button
                            onClick={cancelEdit}
                            className="rounded-lg border border-slate-300 px-4 py-2
                         text-sm font-medium text-slate-700 transition
                         hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (


                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <span className="font-semibold text-slate-500">
                        #{task.id}
                    </span>

                    <span className="min-w-0 flex-1 break-words text-slate-800">
                        {task.title}
                    </span>

                    <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[task.status]}`}>
                            {statusLabels[task.status]}
                        </span>

                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${priorityClasses[task.priority]}`}>
                            {priorityLabels[task.priority]}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="rounded-lg border border-slate-300 px-4 py-2
                         text-sm font-medium text-slate-700 transition
                         hover:bg-slate-100"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(task.id)}
                            className="rounded-lg bg-red-500 px-4 py-2
                         text-sm font-medium text-white transition
                         hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
}

export default TaskItem;