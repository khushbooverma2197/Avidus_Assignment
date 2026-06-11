import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthForm from "./components/AuthForm.jsx";
import ActivityLogs from "./pages/ActivityLogs.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TaskMonitoring from "./pages/TaskMonitoring.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import UserManagement from "./pages/UserManagement.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/register" element={<AuthForm mode="register" />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<TasksPage />} />
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/tasks" element={<TaskMonitoring />} />
            <Route path="/admin/logs" element={<ActivityLogs />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

