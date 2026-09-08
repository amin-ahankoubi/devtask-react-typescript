interface TaskFormProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}


function TaskForm({
    value,
    onChange,
    onSubmit,
}: TaskFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={value}
                placeholder="Enter a task..."
                onChange={event => onChange(event.target.value)}
            />

            <button type="submit">
                Add Task
            </button>
        </form>
    )
}

export default TaskForm;