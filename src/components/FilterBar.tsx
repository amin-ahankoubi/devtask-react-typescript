import type { Task } from "../types/task";

interface FilterBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;

    statusFilter: Task["status"] | "all";
    onStatusChange: (value: Task["status"] | "all") => void;

    priorityFilter: Task["priority"] | "all";
    onPriorityChange: (value: Task["priority"] | "all") => void;

    onClear: () => void;

    resultCount: number;
    totalCount: number;
}

function FilterBar({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusChange,
    priorityFilter,
    onPriorityChange,
    onClear,
    resultCount,
    totalCount,
}: FilterBarProps) {
    return (
        <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search tasks..."
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
                />

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        onStatusChange(
                            event.target.value as Task["status"] | "all"
                        )
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3"
                >
                    <option value="all">All Statuses</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(event) =>
                        onPriorityChange(
                            event.target.value as Task["priority"] | "all"
                        )
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3"
                >
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button
                    type="button"
                    onClick={onClear}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                    Clear Filters
                </button>
            </div>

            <p className="text-sm text-slate-500">
                Showing {resultCount} of {totalCount} tasks
            </p>
        </div>
    );
}

export default FilterBar;