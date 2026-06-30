import { useState, useEffect, Suspense } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  UserCircle,
  LogOut,
  Menu,
  X,
  Bell,
  MessageSquare,
  Award,
} from "lucide-react";

import ThemeToggle from "../components/UI/ThemeToggle";
import { useAuth } from "../context/AuthProvider";

const navItems = [
  {
    to: "/student",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "courses",
    label: "My Courses",
    icon: BookOpen,
  },
  {
    to: "certificates",
    label: "Certificates",
    icon: Award,
  },
  {
    to: "chat",
    label: "Chat",
    icon: MessageSquare,
  },
  {
    to: "profile",
    label: "Profile",
    icon: UserCircle,
  },
];

const StudentLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`
          flex flex-col
          bg-[var(--card)]
          border-r border-[var(--border)]
          transition-all duration-300
          z-30
          ${
            isMobile
              ? `fixed h-full ${
                  mobileOpen ? "translate-x-0" : "-translate-x-full"
                } w-[240px]`
              : `relative ${collapsed ? "w-[60px]" : "w-[240px]"}`
          }
        `}
      >
        <div className="h-[60px] flex items-center gap-3 px-4 border-b border-[var(--border)]">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white">
            <BookOpen size={16} />
          </div>

          {(!collapsed || isMobile) && (
            <span className="font-medium">
              <span className="text-cyan-500">E</span>-Learning
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          <p
            className={`px-4 py-2 text-xs uppercase opacity-40 ${
              collapsed && !isMobile ? "hidden" : ""
            }`}
          >
            Student
          </p>

          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={isMobile ? closeMobile : undefined}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-2
                border-l-2
                transition-all
                ${
                  isActive
                    ? "border-cyan-500 text-cyan-500 bg-cyan-500/10"
                    : "border-transparent hover:bg-[var(--bg)] opacity-70 hover:opacity-100"
                }
              `
              }
            >
              <Icon size={18} />

              {(!collapsed || isMobile) && (
                <span className="text-sm">{label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--border)]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 w-full px-3 py-2 rounded-md hover:bg-red-500/10"
          >
            <LogOut size={18} />

            {(!collapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-[60px] bg-[var(--card)] border-b border-[var(--border)] flex items-center px-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-[var(--bg)]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <h1 className="ml-3 font-semibold flex-1">
            Student Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <ThemeToggle />

            <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center text-sm font-semibold">
              ST
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;