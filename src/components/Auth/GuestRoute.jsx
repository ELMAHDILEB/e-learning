import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { getDashboardPath } from "../../services/auth";

const GuestRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-[var(--text)] opacity-50">
        Loading...
      </div>
    );
  }

  if (token && user) {
    return <Navigate to={getDashboardPath(user)} replace />;
  }

  return children;
};

export default GuestRoute;
