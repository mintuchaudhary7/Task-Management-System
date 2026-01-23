import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import DoerLayout from "./layouts/DoerLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import Templates from "./pages/admin/Templates";
import Users from "./pages/admin/Users";
import Instances from "./pages/admin/Instances";
import InstanceDetails from "./pages/admin/InstanceDetails";
import Tasks from "./pages/admin/Tasks";

// Doer pages
import DoerDashboard from "./pages/doer/Dashboard";
import Profile from "./pages/doer/Profile";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/login" element={<Login />} />

      {/* ✅ ADMIN ROUTES (GROUPED) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="templates" element={<Templates />} />
        <Route path="instances" element={<Instances />} />
        <Route path="instances/:id" element={<InstanceDetails />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>

      {/* ✅ DOER ROUTES (GROUPED) */}
      <Route
        path="/doer"
        element={
          <ProtectedRoute role="DOER">
            <DoerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DoerDashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
