import { Save } from "lucide-react";
import { useEffect, useState } from "react";

const emptyTask = { title: "", description: "", status: "Pending" };

export default function TaskForm({ editingTask, onCancel, onSubmit }) {
  const [task, setTask] = useState(emptyTask);

  useEffect(() => {
    setTask(editingTask || emptyTask);
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(task);
    setTask(emptyTask);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="Task title"
        value={task.title}
        onChange={(event) => setTask({ ...task, title: event.target.value })}
        required
      />
      <input
        placeholder="Description"
        value={task.description}
        onChange={(event) => setTask({ ...task, description: event.target.value })}
      />
      <select
        value={task.status}
        onChange={(event) => setTask({ ...task, status: event.target.value })}
      >
        <option>Pending</option>
        <option>Completed</option>
      </select>
      <button>
        <Save size={18} /> {editingTask ? "Update" : "Create"}
      </button>
      {editingTask && (
        <button className="secondary-btn" type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

