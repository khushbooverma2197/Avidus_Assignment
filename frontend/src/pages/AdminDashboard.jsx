import { CheckCircle, ClipboardList, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/client.js";

const cards = [
  { key: "totalUsers", label: "Total Users", icon: <Users size={24} /> },
  { key: "totalTasks", label: "Total Tasks", icon: <ClipboardList size={24} /> },
  { key: "completedTasks", label: "Completed Tasks", icon: <CheckCircle size={24} /> },
  { key: "pendingTasks", label: "Pending Tasks", icon: <Clock size={24} /> }
];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    apiRequest("/admin/analytics").then(setAnalytics);
  }, []);

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>Analytics</h2>
          <p>Overview across users and tasks.</p>
        </div>
      </div>
      <div className="stats-grid">
        {cards.map(({ key, label, icon }) => (
          <article className="stat-card" key={key}>
            {icon}
            <span>{label}</span>
            <strong>{analytics[key] ?? 0}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
