import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  // Show loading while checking localStorage / user session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are passed, check access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
