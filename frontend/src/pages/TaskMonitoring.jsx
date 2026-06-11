import { Trash2 } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/client.js";

export default function TaskMonitoring() {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    setTasks(await apiRequest("/admin/tasks"));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function deleteTask(id) {
    await apiRequest(`/tasks/${id}`, { method: "DELETE" });
    await loadTasks();
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>Task Monitoring</h2>
          <p>View all tasks created by users.</p>
        </div>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.createdBy?.name || "Deleted user"}</td>
                <td><span className={`status ${task.status.toLowerCase()}`}>{task.status}</span></td>
                <td>{new Date(task.updatedAt).toLocaleDateString()}</td>
                <td>
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

