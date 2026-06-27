import { Link } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import GoogleLoginButton from "../../components/Auth/GoogleLoginButton";
import useAuthForm from "../../hooks/useAuthForm";
import { getGoogleLoginUrl } from "../../services/auth";

export default function Register() {
  const { handleSubmit, errors, loading } = useAuthForm("register");

  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  return (
    <AuthForm
      title="Create your account"
      buttonText="Register"
      onSubmit={handleSubmit}
      loading={loading}
      googleButton={<GoogleLoginButton onClick={handleGoogleLogin} loading={loading} />}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--primary)]">
            Sign in
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
        <label className="block text-sm mb-2">Username</label>
        <input
          name="username"
          disabled={loading}
          className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)] disabled:opacity-60"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2">First name</label>
          <input
            name="firstName"
            disabled={loading}
            className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)] disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Last name</label>
          <input
            name="lastName"
            disabled={loading}
            className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)] disabled:opacity-60"
          />
        </div>
      </div>

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
    </AuthForm>
  );
}
