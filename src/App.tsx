import { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskList from './components/TaskList'
import type { Task } from './types/task'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'

function App() {

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const [searchTerm, setSearchTerm] = useState('')

  const [statusFilter, setStatusFilter] = useState<Task['status'] | 'all'>('all')

  const [priorityFilter, setPriorityFilter] = useState<Task['priority'] | 'all'>('all')

  const initialTasks: Task[] = [
    {
      id: 1,
      title: 'Task',
      status: 'in-progress',
      priority: 'high',
    },
  ]

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('devtask-tasks')

    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks)

        if (isTaskArray(parsedTasks)) {
          return parsedTasks
        }

        return initialTasks
      } catch {
        return initialTasks
      }
    }

    return initialTasks
  })

  function isTask(value: unknown) {
    return (
      typeof value === 'object' &&
      value !== null &&
      typeof value.id === 'number' &&
      typeof value.title === 'string'
      &&
      (
        value.status === 'todo' ||
        value.status === 'in-progress' ||
        value.status === 'done'
      )
      &&
      (
        value.priority === 'low' ||
        value.priority === 'medium' ||
        value.priority === 'high'
      )
    )
  }

  function isTaskArray(value: unknown) {
    return Array.isArray(value) && value.every(item => isTask(item))
  }

  console.log(isTask({
    id: 1,
    title: 'Learn React',
    status: 'done',
    priority: 'high'
  }))

  useEffect(() => {
    localStorage.setItem('devtask-tasks', JSON.stringify(tasks))
  }, [tasks])

  const filteredTasks = tasks.filter(task => {

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' ||
      task.status === statusFilter

    const matchesPriority =
      priorityFilter === 'all' ||
      task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  function deleteTask(id: number) {
    setTasks(previousTasks =>
      previousTasks.filter(task => task.id !== id))
  }


  function editTask(id: number, newTitle: string) {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, title: newTitle }
          : task
      )
    )
  }

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (newTaskTitle.trim() === '') return

    setTasks(previousTasks => [
      ...previousTasks,
      {
        id: previousTasks.length === 0
          ? 1
          : Math.max(...previousTasks.map(task => task.id)) + 1,
        title: newTaskTitle.trim(),
        status: 'todo',
        priority: 'medium',
      },
    ])
    setNewTaskTitle('')
  }

  function changeTaskStatus(id: number, status: Task['status']) {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, status }
          : task
      )
    )
  }

  function changeTaskPriority(id: number, priority: Task['priority']) {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, priority }
          : task
      )
    )
  }

  function clearFilters() {
    setSearchTerm('')
    setStatusFilter('all')
    setPriorityFilter('all')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Header
          title="DevTask"
          description="Task management system"
          userName="Amin"
        />

        <main className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2
            className='my-3 text-2xl font-bold tracking-tight text-slate-900'>
            My Tasks
          </h2>

          <TaskForm
            value={newTaskTitle}
            onChange={setNewTaskTitle}
            onSubmit={addTask}
          />

          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            onClear={clearFilters}
            resultCount={filteredTasks.length}
            totalCount={tasks.length}
          />

          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onSave={editTask}
            onStatusChange={changeTaskStatus}
            onPriorityChange={changeTaskPriority}

          />

          <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total Tasks
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {tasks.length}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Tasks in your workspace
              </p>
            </div>
          </section>
        </main>
      </div >
    </div >
  )
}

export default App