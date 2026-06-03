import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import ThemeToggle from "../UI/ThemeToggle.jsx";

const Header = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
  ];

  const [openNav, setOpenNav] = useState(false);
  const toggleNav = () => setOpenNav((prev) => !prev);
  const closeNav = () => setOpenNav(false);

  return (
    <header className="sticky top-0 z-[9999] w-full h-20 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">

        {/* Logo */}
        <NavLink to="/" onClick={closeNav} className="text-2xl font-bold">
          <span className="text-cyan-500">E</span>-Learning
        </NavLink>

        {/* Nav */}
        <nav className={`navLinks ${openNav ? "open" : ""}`}>
          <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full md:w-auto">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={closeNav}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[var(--primary)] uppercase"
                      : "text-[var(--text)] uppercase"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            <li className="md:hidden flex flex-col items-center gap-3 pt-2">
              <NavLink
                to="/login"
                onClick={closeNav}
                className="inline-flex items-center px-5 py-2 rounded-md border border-[var(--border)] text-[var(--text)] uppercase text-sm font-medium hover:border-cyan-500 hover:text-cyan-500 transition-colors duration-200"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={closeNav}
                className="inline-flex items-center px-5 py-2 rounded-md bg-cyan-500 text-white uppercase text-sm font-medium hover:bg-cyan-600 transition-colors duration-200"
              >
                Register
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            onClick={closeNav}
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded-md border border-[var(--border)] text-[var(--text)] uppercase text-sm font-medium hover:border-cyan-500 hover:text-cyan-500 transition-colors duration-200"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            onClick={closeNav}
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded-md bg-cyan-500 text-white uppercase text-sm font-medium hover:bg-cyan-600 transition-colors duration-200"
          >
            Register
          </NavLink>

          <ThemeToggle />

          <button className="md:hidden text-[var(--text)]" onClick={toggleNav}>
            {openNav ? (
              <IoClose className="text-2xl" />
            ) : (
              <CgMenuRightAlt className="text-2xl" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;