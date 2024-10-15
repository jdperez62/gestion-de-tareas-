import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import TaskForm from "./components/TaskForm";
import "./index.css";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [isListView, setIsListView] = useState(false); // Estado para la vista de lista

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const markAsComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Calcular total de tareas y completadas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Gestión de Tareas</h1>

        {/* Formulario para agregar tareas */}
        <TaskForm onSubmit={addTask} />

        {/* Contenedor para el resumen y el filtro */}
        <div className="flex items-center mb-4 mt-4">
          {/* Resumen de tareas */}
          <p className="mr-4">
            Total de tareas: {totalTasks} | Tareas completadas: {completedTasks}
          </p>

          {/* Selector para cambiar el filtro */}
          <label htmlFor="filter" className="label-filter mr-2">
            Filtrar tareas:
          </label>
          <select
            id="filter"
            className="select-filter"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "completed" | "pending")
            }
          >
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>

          {/* Checkbox para cambiar la vista */}
          <div>
            <label htmlFor="listView" className="checkbox-container">
              <input
                type="checkbox"
                id="listView"
                checked={isListView}
                onChange={() => setIsListView(!isListView)}
              />
              Vista en fila
            </label>
          </div>
        </div>

        {/* Aquí se pasa el filtro y la vista al componente TaskList */}
        <TaskList
          tasks={tasks}
          filter={filter}
          markAsComplete={markAsComplete}
          deleteTask={deleteTask}
          isListView={isListView} // Pasar el estado de la vista
        />

        <Routes>
          <Route
            path="/task/:id"
            element={
              <TaskDetails tasks={tasks} markAsComplete={markAsComplete} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
