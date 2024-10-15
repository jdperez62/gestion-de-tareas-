import React from "react";
import { useParams } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

interface TaskDetailsProps {
  tasks: Task[];
  markAsComplete: (taskId: number) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ tasks, markAsComplete }) => {
  const { id } = useParams<{ id: string }>(); // Especifica que id es un string

  // Verifica si id está definido antes de usarlo
  const taskId = id ? parseInt(id) : null; // Asigna null si id es undefined

  const task = taskId !== null ? tasks.find((t) => t.id === taskId) : undefined;

  if (!task) return <p>Tarea no encontrada.</p>;

  return (
    <div className="mt-4">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Fecha Límite: {task.dueDate}</p>
      <p>Prioridad: {task.priority}</p>
      {!task.completed && (
        <>
          <button onClick={() => markAsComplete(task.id)}>
            Marcar como completada
          </button>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
