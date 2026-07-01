import { Link } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import GoogleLoginButton from "../../components/Auth/GoogleLoginButton";
import useAuthForm from "../../hooks/useAuthForm";
import { getGoogleLoginUrl } from "../../services/auth";

export default function Login() {
  const { handleSubmit, errors, loading } = useAuthForm("login");

  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  return (
    <AuthForm
      title="Sign in to UniLearn"
      buttonText="Sign in"
      onSubmit={handleSubmit}
      loading={loading}
      googleButton={<GoogleLoginButton onClick={handleGoogleLogin} loading={loading} />}
      footer={
        <>
          Not a member?{" "}
          <Link to="/register" className="text-[var(--primary)]">
            Register
          </Link>
        </>
      }
    >
      {errors.general && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-500/10 p-3 text-xs text-red-500">
          {errors.general}
        </div>
      )}

      {Object.keys(errors).filter((k) => k !== "general").length > 0 && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-500/10 p-3">
          <ul className="space-y-1 text-xs text-red-500">
            {Object.entries(errors)
              .filter(([key]) => key !== "general")
              .map(([key, msg]) => (
                <li key={key} className="flex items-start gap-1">
                  <span>*</span>
                  <span>{msg}</span>
                </li>
              ))}
          </ul>
        </div>
      )}

      <div>
        <label className="block text-sm mb-2">Email</label>
        <input
          name="email"
          type="email"
          disabled={loading}
          className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)] disabled:opacity-60"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Password</label>
        <input
          name="password"
          type="password"
          disabled={loading}
          className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)] disabled:opacity-60"
        />
      </div>

      <div className="text-right text-sm">
        <Link to="/forgot-password" className="text-[var(--primary)]">
          Forgot password?
        </Link>
      </div>
    </AuthForm>
  );
}
