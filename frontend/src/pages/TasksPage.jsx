import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/client.js";
import TaskForm from "../components/TaskForm.jsx";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");

  async function loadTasks() {
    setTasks(await apiRequest("/tasks"));
  }

  useEffect(() => {
    loadTasks().catch((err) => setError(err.message));
  }, []);

  async function saveTask(task) {
    const isEditing = Boolean(task._id);
    const path = isEditing ? `/tasks/${task._id}` : "/tasks";
    const method = isEditing ? "PUT" : "POST";
    await apiRequest(path, { method, body: JSON.stringify(task) });
    setEditingTask(null);
    await loadTasks();
  }

  async function deleteTask(id) {
    await apiRequest(`/tasks/${id}`, { method: "DELETE" });
    await loadTasks();
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>My Tasks</h2>
          <p>Create, track and complete your own work items.</p>
        </div>
      </div>
      <TaskForm editingTask={editingTask} onCancel={() => setEditingTask(null)} onSubmit={saveTask} />
      {error && <p className="error">{error}</p>}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description || "-"}</td>
                <td><span className={`status ${task.status.toLowerCase()}`}>{task.status}</span></td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="icon-btn" onClick={() => setEditingTask(task)} aria-label="Edit task">
                    <Edit size={16} />
                  </button>
                  <button className="icon-btn danger" onClick={() => deleteTask(task._id)} aria-label="Delete task">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

