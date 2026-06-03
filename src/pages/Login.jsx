import { Link } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import useAuthForm from "../hooks/useAuthForm";

export default function Login() {

  const { handleSubmit, errors } = useAuthForm("login", async (data) => {
    console.log("LOGIN API:", data);
  });

  return (
    <AuthForm
      title="Sign in to your account"
      buttonText="Sign in"
      onSubmit={handleSubmit}
      footer={
        <>
          Not a member?{" "}
          <Link to="/register" className="text-[var(--primary)]">
            Register
          </Link>
        </>
      }
    >

      {/* ERROR BOX */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-500/10 p-3">
          <ul className="space-y-1 text-xs text-red-500">
            {Object.values(errors).map((msg, i) => (
              <li key={i} className="flex items-start gap-1">
                <span>*</span>
                <span>{msg}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* EMAIL */}
      <div>
        <label className="block text-sm mb-2">Email</label>
        <input
          name="email"
          type="email"
          className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)]"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-sm mb-2">Password</label>
        <input
          name="password"
          type="password"
          className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)]"
        />
      </div>

      {/* FORGOT PASSWORD */}
      <div className="text-right text-sm">
        <Link to="/forgot-password" className="text-[var(--primary)]">
          Forgot password?
        </Link>
      </div>

    </AuthForm>
  );
}