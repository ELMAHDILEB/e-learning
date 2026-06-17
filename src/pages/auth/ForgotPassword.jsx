import { Link } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import useAuthForm from "../../hooks/useAuthForm";

const ForgotPassword = () => {

  const { handleSubmit, errors } = useAuthForm(
    "forgotPassword",
    async (data) => {
      console.log("FORGOT PASSWORD API:", data);

      // API CALL
      // ********
      // ********
      // ********
      // ********
      // ********
    }
  );

  return (
    <AuthForm
      title="Forgot your password?"
      buttonText="Send reset link"
      onSubmit={handleSubmit}
      footer={
        <>
          Remember your password?{" "}
          <Link to="/login" className="text-[var(--primary)] hover:opacity-80">
            Sign in
          </Link>
        </>
      }
    >
      <p className="text-sm text-[var(--text)] opacity-70">
        Enter your email address and we’ll send you a link to reset your
        password.
      </p>

      <div>
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
        <label className="block text-sm mb-2 text-[var(--text)]">
          Email address
        </label>

        <input
          type="email"
          name="email"
          className="
            w-full rounded-md px-3 py-2
            bg-[var(--card)]
            text-[var(--text)]
            border border-[var(--border)]
            focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
          "
          placeholder="you@example.com"
        />
      </div>
    </AuthForm>
  );
};

export default ForgotPassword;
