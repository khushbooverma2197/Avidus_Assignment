import React from "react";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/client.js";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    apiRequest("/admin/activity-logs").then(setLogs);
  }, []);

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>Activity Logs</h2>
          <p>Login and task activity across the application.</p>
        </div>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Message</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{log.user?.name || "Unknown"}</td>
                <td>{log.action}</td>
                <td>{log.message}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

