import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"; // Importa el icono de eliminar
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Importa el icono de completar

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string; // Asegúrate de que este sea un string en formato ISO o similar
  priority: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  markAsComplete: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  markAsComplete,
  deleteTask,
}) => {
  const dueDate = new Date(task.dueDate); // Convertir el string a un objeto Date
  const isDueSoon =
    dueDate.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000; // Vence en menos de 24 horas

  return (
    <article
      className={`task-card ${task.completed ? "completed-task" : ""} ${
        !task.completed && isDueSoon ? "due-soon" : ""
      }`}
    >
      <header>
        <span>{task.title}</span>
      </header>
      <footer>
        <p>{`Descripción: ${task.description}`}</p>
        <p>{`Fecha Límite: ${task.dueDate} - Prioridad: ${task.priority}`}</p>

        {/* Contenedor para los botones */}
        <div className="button-container">
          {!task.completed && (
            <button
              className="task-button"
              onClick={() => markAsComplete(task.id)}
            >
              <CheckCircleIcon style={{ marginRight: "0.5rem" }} /> Completar
            </button>
          )}
          {/* Botón de eliminar con icono */}
          <button className="task-button" onClick={() => deleteTask(task.id)}>
            <DeleteForeverIcon style={{ marginRight: "0.5rem" }} />
            Eliminar
          </button>
        </div>
      </footer>
    </article>
  );
};

export default TaskItem;
