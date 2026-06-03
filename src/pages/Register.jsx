import { Link } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import useAuthForm from "../hooks/useAuthForm";

export default function Register() {

  const { handleSubmit, errors } = useAuthForm("register", async (data) => {
      console.log("REGISTER API:", data);
    });
  

  return (
    <AuthForm
      title="Create your account"
      buttonText="Register"
      onSubmit={handleSubmit}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--primary)]">
            Sign in
          </Link>
        </>
      }
    >

       { /* ERROR BOX */}
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

      {/* USERNAME */}
      <div>
        <label className="block text-sm mb-2">Username</label>
        <input
          name="username"
          className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)]"
        />
      </div>

      {/* FIRST + LAST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm mb-2">First name</label>
          <input
            name="firstName"
            className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Last name</label>
          <input
            name="lastName"
            className="w-full rounded-md px-3 py-2 bg-[var(--card)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>

      </div>

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

    </AuthForm>
  );
}