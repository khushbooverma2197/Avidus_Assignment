import { Trash2 } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/client.js";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    setUsers(await apiRequest("/admin/users"));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function updateStatus(user, status) {
    await apiRequest(`/admin/users/${user._id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
    await loadUsers();
  }

  async function deleteUser(id) {
    await apiRequest(`/admin/users/${id}`, { method: "DELETE" });
    await loadUsers();
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>User Management</h2>
          <p>Manage access and account status.</p>
        </div>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select value={user.status} onChange={(event) => updateStatus(user, event.target.value)}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="icon-btn danger" onClick={() => deleteUser(user._id)} aria-label="Delete user">
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

