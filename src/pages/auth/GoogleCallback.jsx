import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getMe, getDashboardPath } from "../../services/auth";
import { useAuth } from "../../context/AuthProvider";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const authError = searchParams.get("error");

    if (authError) {
      setError("Google login failed. Please try again.");
      return;
    }

    if (!token) {
      setError("Missing authentication token.");
      return;
    }

    const completeLogin = async () => {
      try {
        localStorage.setItem("token", token);
        const { data: user } = await getMe();
        loginSuccess(token, user);
        navigate(getDashboardPath(user), { replace: true });
      } catch {
        localStorage.removeItem("token");
        setError("Could not complete Google login. Please try again.");
      }
    };

    completeLogin();
  }, [searchParams, navigate, loginSuccess]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {error ? (
          <>
            <p className="text-red-500 mb-4">{error}</p>
            <Link to="/login" className="text-[var(--primary)] hover:underline">
              Back to login
            </Link>
          </>
        ) : (
          <p className="text-[var(--text)] opacity-70">Completing Google sign in...</p>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
