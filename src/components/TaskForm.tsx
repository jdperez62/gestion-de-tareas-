// TaskForm.tsx
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save"; // Importa el icono

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

interface TaskFormProps {
  onSubmit: (task: Task) => void; // Define el tipo de la función onSubmit
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("baja");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
    });
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("baja");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      {/* Botón de guardar con el icono */}
      <button type="submit" className="task-button">
        <SaveIcon style={{ marginRight: "0.5rem" }} />
        Guardar Tarea
      </button>
    </form>
  );
};

export default TaskForm;
