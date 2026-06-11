import { CheckCircle, ClipboardList, Clock, Users } from "lucide-react";
import { createElement } from "react";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/client.js";

const cards = [
  { key: "totalUsers", label: "Total Users", Icon: Users },
  { key: "totalTasks", label: "Total Tasks", Icon: ClipboardList },
  { key: "completedTasks", label: "Completed Tasks", Icon: CheckCircle },
  { key: "pendingTasks", label: "Pending Tasks", Icon: Clock }
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
        {cards.map(({ key, label, Icon }) => (
          <article className="stat-card" key={key}>
            {createElement(Icon, { size: 24 })}
            <span>{label}</span>
            <strong>{analytics[key] ?? 0}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
