import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { LogOut, LayoutDashboard } from "lucide-react";
import ThemeToggle from "../UI/ThemeToggle.jsx";
import { useAuth } from "../../context/AuthProvider";
import { getDashboardPath } from "../../services/auth";

const Header = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
  ];

  const [openNav, setOpenNav] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => setOpenNav((prev) => !prev);
  const closeNav = () => setOpenNav(false);

  const handleLogout = async () => {
    await logout();
    closeNav();
    navigate("/");
  };

  const dashboardPath = user ? getDashboardPath(user) : "/login";
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-[9999] w-full h-20 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
        <NavLink to="/" onClick={closeNav} className="text-2xl font-bold">
          <span className="text-cyan-500">Uni</span>Learn
        </NavLink>

        <nav className={`navLinks ${openNav ? "open" : ""}`}>
          <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full md:w-auto">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} onClick={closeNav}
                  className={({ isActive }) =>
                    `nav-link-animated uppercase ${isActive ? "text-[var(--primary)] active" : "text-[var(--text)]"}`
                  }>
                  {link.label}
                </NavLink>
              </li>
            ))}

            {!loading && (
              <li className="md:hidden flex flex-col items-center gap-3 pt-2">
                {user ? (
                  <>
                    <NavLink to={dashboardPath} onClick={closeNav}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-cyan-500 text-white uppercase text-sm font-medium">
                      <LayoutDashboard size={14} /> Dashboard
                    </NavLink>
                    <button onClick={handleLogout}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[var(--border)] text-sm uppercase">
                      <LogOut size={14} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" onClick={closeNav}
                      className="inline-flex items-center px-5 py-2 rounded-md border border-[var(--border)] uppercase text-sm">Login</NavLink>
                    <NavLink to="/register" onClick={closeNav}
                      className="inline-flex items-center px-5 py-2 rounded-md bg-cyan-500 text-white uppercase text-sm">Register</NavLink>
                  </>
                )}
              </li>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {!loading && user ? (
            <>
              <NavLink to={dashboardPath} onClick={closeNav}
                className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 ui-btn">
                <LayoutDashboard size={14} /> Dashboard
              </NavLink>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border)]">
                <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-[10px] font-medium">
                  {initials}
                </div>
                <span className="text-sm">{user.name?.split(" ")[0]}</span>
              </div>
              <button onClick={handleLogout} title="Logout"
                className="hidden md:inline-flex p-1.5 rounded-md opacity-60 hover:opacity-100 hover:bg-[var(--bg)] hover:text-red-500 transition-all">
                <LogOut size={18} />
              </button>
            </>
          ) : !loading ? (
            <>
              <NavLink to="/login" onClick={closeNav}
                className="hidden md:inline-flex items-center px-4 py-1.5 rounded-md border border-[var(--border)] uppercase text-sm hover:border-cyan-500 hover:text-cyan-500 ui-btn">
                Login
              </NavLink>
              <NavLink to="/register" onClick={closeNav}
                className="hidden md:inline-flex items-center px-4 py-1.5 rounded-md bg-cyan-500 text-white uppercase text-sm hover:bg-cyan-600 ui-btn">
                Register
              </NavLink>
            </>
          ) : null}

          <ThemeToggle />

          <button className="md:hidden text-[var(--text)]" onClick={toggleNav}>
            {openNav ? <IoClose className="text-2xl" /> : <CgMenuRightAlt className="text-2xl" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
