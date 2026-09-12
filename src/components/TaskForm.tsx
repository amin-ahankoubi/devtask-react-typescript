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
        <form
            onSubmit={onSubmit}
            className="mb-6 flex flex-col gap-3 sm:flex-row">
            <input
                type="text"
                value={value}
                placeholder="Enter a task..."
                onChange={event => onChange(event.target.value)}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />

            <button
                type="submit"
                className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700 active:scale-95">
                Add Task
            </button>
        </form>
    )
}

export default TaskForm;