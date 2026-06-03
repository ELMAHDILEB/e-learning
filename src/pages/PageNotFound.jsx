import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="text-center">

        <h1 className="text-7xl md:text-9xl font-extrabold text-[var(--primary)]">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[var(--text)]">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm md:text-base text-[var(--text)] opacity-70 max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="
            inline-flex items-center justify-center
            mt-8
            px-6 py-3
            rounded-md
            bg-[var(--primary)]
            text-white
            font-medium
            hover:opacity-90
            transition
          "
        >
          Back To Home
        </Link>

      </div>
    </section>
  );
};

export default PageNotFound;