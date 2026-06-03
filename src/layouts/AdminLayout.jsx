import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, BookOpen, PlusCircle,
  UserCircle, LogOut, Menu, X, Bell,
} from "lucide-react";
import ThemeToggle from "../components/UI/ThemeToggle";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/create-course", label: "Create Course", icon: PlusCircle },
  { to: "/admin/profile", label: "Profile", icon: UserCircle },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setMobileOpen((prev) => !prev);
    else setCollapsed((prev) => !prev);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">

      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`
          flex flex-col bg-[var(--card)] border-r border-[var(--border)]
          transition-all duration-300 ease-in-out z-30
          ${isMobile
            ? `fixed h-full ${mobileOpen ? "translate-x-0" : "-translate-x-full"} w-[240px]`
            : `relative ${collapsed ? "w-[60px]" : "w-[240px]"}`
          }
        `}
      >
        <div className="h-[60px] flex items-center gap-3 px-4 border-b border-[var(--border)] overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 min-w-[32px] rounded-lg bg-cyan-500 flex items-center justify-center text-white">
            <BookOpen size={16} />
          </div>
          {(!collapsed || isMobile) && (
            <span className="text-[15px] font-medium whitespace-nowrap">
              <span className="text-cyan-500">E</span>-Learning
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {(!collapsed || isMobile) && (
            <p className="px-4 py-2 text-[11px] uppercase tracking-widest text-[var(--text)] opacity-40">
              Main
            </p>
          )}
          {navItems.slice(0, 4).map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={isMobile ? closeMobile : undefined}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-[9px] text-[13px]
                border-l-2 transition-all duration-150 overflow-hidden whitespace-nowrap
                ${isActive
                  ? "border-cyan-500 text-cyan-500 bg-cyan-500/10"
                  : "border-transparent text-[var(--text)] opacity-60 hover:opacity-100 hover:bg-[var(--bg)]"
                }
              `}
            >
              <Icon size={18} className="min-w-[18px]" />
              {(!collapsed || isMobile) && <span>{label}</span>}
            </NavLink>
          ))}

          {(!collapsed || isMobile) && (
            <p className="px-4 py-2 mt-2 text-[11px] uppercase tracking-widest text-[var(--text)] opacity-40">
              Account
            </p>
          )}
          {navItems.slice(4).map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={isMobile ? closeMobile : undefined}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-[9px] text-[13px]
                border-l-2 transition-all duration-150 overflow-hidden whitespace-nowrap
                ${isActive
                  ? "border-cyan-500 text-cyan-500 bg-cyan-500/10"
                  : "border-transparent text-[var(--text)] opacity-60 hover:opacity-100 hover:bg-[var(--bg)]"
                }
              `}
            >
              <Icon size={18} className="min-w-[18px]" />
              {(!collapsed || isMobile) && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--border)]">
          <button
            onClick={() => navigate("/")}
            className={`
              flex items-center gap-3 w-full px-3 py-2 rounded-md text-[13px]
              text-red-500 hover:bg-red-500/10 transition-colors overflow-hidden whitespace-nowrap
            `}
          >
            <LogOut size={18} className="min-w-[18px]" />
            {(!collapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">

        <header className="h-[60px] min-h-[60px] bg-[var(--card)] border-b border-[var(--border)] flex items-center px-4 gap-3">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md text-[var(--text)] opacity-60 hover:opacity-100 hover:bg-[var(--bg)] transition-all"
            aria-label="Toggle sidebar"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <span className="flex-1 text-[15px] font-medium">Admin Panel</span>

          <div className="flex items-center gap-2">
            <button className="relative p-1.5 rounded-md text-[var(--text)] opacity-60 hover:opacity-100 hover:bg-[var(--bg)] transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-[var(--card)]" />
            </button>
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-medium cursor-pointer">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;