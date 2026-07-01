import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { getDashboardPath } from "../../services/auth";

const ProtectedRoute = ({ children, roles }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--text)]">
        Loading...
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role?.name)) {
    return <Navigate to={getDashboardPath(user)} replace />;
  }

  return children;
};

export default ProtectedRoute;
