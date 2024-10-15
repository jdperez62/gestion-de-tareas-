import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  filter: "all" | "completed" | "pending";
  markAsComplete: (taskId: number) => void;
  deleteTask: (id: number) => void;
  isListView: boolean; // Prop para determinar la vista
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  markAsComplete,
  deleteTask,
  isListView,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // all tasks
  });

  return (
    <div
      className={`tasks-container ${isListView ? "list-view" : "grid-view"}`}
    >
      {isListView ? (
        <table className="w-full">
          <thead>
            <tr>
              <th>Tarea</th>
              <th>Descripción</th>
              <th>Fecha Límite</th>
              <th>Prioridad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => {
              const dueDate = new Date(task.dueDate);
              const isDueSoon =
                dueDate.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000; // Vence en menos de 24 horas

              return (
                <tr
                  key={task.id}
                  className={isDueSoon && !task.completed ? "bg-red-100" : ""}
                >
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.priority}</td>
                  <td>
                    {/* Mostrar ambos botones */}
                    {!task.completed && (
                      <button
                        className="task-button button-spacing"
                        onClick={() => markAsComplete(task.id)}
                      >
                        Completar
                      </button>
                    )}
                    {/* Siempre mostrar el botón de eliminar */}
                    <button
                      className="task-button"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            markAsComplete={markAsComplete}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
