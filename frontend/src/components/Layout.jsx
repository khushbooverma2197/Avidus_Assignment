import { Activity, CheckSquare, LayoutDashboard, LogOut, Shield, Users } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Layout() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <h1>Avidus Tasks</h1>
          <p>{user?.name}</p>
        </div>
        <nav>
          <NavLink to="/">
            <CheckSquare size={18} /> My Tasks
          </NavLink>
          {isAdmin && (
            <>
              <NavLink to="/admin">
                <LayoutDashboard size={18} /> Analytics
              </NavLink>
              <NavLink to="/admin/users">
                <Users size={18} /> Users
              </NavLink>
              <NavLink to="/admin/tasks">
                <Shield size={18} /> Task Monitor
              </NavLink>
              <NavLink to="/admin/logs">
                <Activity size={18} /> Activity Logs
              </NavLink>
            </>
          )}
        </nav>
        <button className="ghost-btn" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

