const AuthForm = ({ title, children, buttonText, onSubmit, footer, loading, googleButton }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--text)] px-4 py-8">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">{title}</h2>

        {googleButton && (
          <div className="mb-5">
            {googleButton}
          </div>
        )}

        {googleButton && (
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--bg)] px-2 opacity-60">or</span>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          {children}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-2 rounded-md hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Please wait..." : buttonText}
          </button>
        </form>

        {footer && (
          <p className="mt-5 text-center text-sm opacity-80">{footer}</p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
