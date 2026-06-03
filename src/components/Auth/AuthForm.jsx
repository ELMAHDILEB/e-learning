const AuthForm = ({ title, children, buttonText, onSubmit, footer }) => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--text)] px-4 py-8">

      <div className="w-full max-w-md">

        <h2 className="text-center text-2xl font-bold mb-6">
          {title}
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">

          {children}

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white py-2 rounded-md hover:opacity-90 transition"
          >
            {buttonText}
          </button>

        </form>

        {footer && (
          <p className="mt-5 text-center text-sm opacity-80">
            {footer}
          </p>
        )}

      </div>

    </div>
  );
};

export default AuthForm;