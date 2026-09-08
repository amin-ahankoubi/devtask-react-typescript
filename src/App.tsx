import { useState } from 'react'
import Header from './components/Header'
import TaskList from './components/TaskList'
import type { Task } from './types/task'

function App() {

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Learn React',
    },
    {
      id: 2,
      title: 'Practice TypeScript',
    },
    {
      id: 3,
      title: 'Build DevTask',
    }
  ])


  function deleteTask(id: number) {
    setTasks(previousTasks =>
      previousTasks.filter(task => task.id !== id))
  }


  function editTask(id: number, newTitle: string) {
    setTasks(previousTasks =>
      previousTasks.map(task => 
        task.id === id
        ? {...task, title: newTitle}
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
      },
    ])
    setNewTaskTitle('')
  }

  return (
    <div>~
      <Header
        title="DevTask"
        description="Task management system"
        userName="Amin"
      />

      <main>
        <h2>My Tasks</h2>

        <form onSubmit={addTask}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.target.value)}
          /> <button type='submit'>Add Task</button>
        </form>


        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onSave={editTask}
        />

        <p>Total Tasks: {tasks.length}</p>

      </main>
    </div >
  )
}

export default App