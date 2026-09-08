import { useState } from "react";
import type { Task } from "../types/task";

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onSave: (id: number, title: string) => void
}


function TaskItem({ task, onDelete, onSave }: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(task.title)

    function saveTask() {
        const title = editedTitle.trim()
        if (title === '') return
        
        onSave(task.id, editedTitle)
        setIsEditing(false)
    }

    return (
        isEditing ? (
            <>
                {task.id} :
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(event) => setEditedTitle(event.target.value)}
                />
                <button onClick={saveTask}>Save</button>
            </>
        ) : (
            <>
                {task.id} : {task.title}

                <button onClick={() => setIsEditing(true)}>
                    Edit
                </button>

                <button onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </>
        )
    )


}



export default TaskItem;