import { useState, useEffect, Suspense } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  UserCircle,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Home,
} from "lucide-react";
import ThemeToggle from "../components/UI/ThemeToggle";
import NotificationBell from "../components/UI/NotificationBell";
import PageTransition from "../components/UI/PageTransition.jsx";
import PageLoading from "../components/UI/PageLoading.jsx";
import { useAuth } from "../context/AuthProvider";

const navItems = [
  { to: "/student", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "courses", label: "My Courses", icon: BookOpen },
  { to: "chat", label: "Messages", icon: MessageSquare },
  { to: "profile", label: "Profile", icon: UserCircle },
];

const StudentLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const isStudyZone = /\/lessons\/|\/quiz/.test(location.pathname);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "ST";

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

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

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {mobileOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`flex flex-col bg-[var(--card)] border-r border-[var(--border)] transition-all duration-300 z-30
          ${isMobile ? `fixed h-full ${mobileOpen ? "translate-x-0" : "-translate-x-full"} w-[240px]` : `relative ${collapsed ? "w-[60px]" : "w-[240px]"}`}`}
      >
        <div className="h-[60px] flex items-center gap-3 px-4 border-b border-[var(--border)]">
          <div className="w-8 h-8 min-w-[32px] rounded-lg bg-cyan-500 flex items-center justify-center text-white">
            <BookOpen size={16} />
          </div>
          {(!collapsed || isMobile) && (
            <span className="text-[15px] font-medium whitespace-nowrap">
              <span className="text-cyan-500">Uni</span>Learn
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={isMobile ? () => setMobileOpen(false) : undefined}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-[9px] text-[13px] border-l-2 transition-all
                ${isActive ? "border-cyan-500 text-cyan-500 bg-cyan-500/10" : "border-transparent text-[var(--text)] opacity-60 hover:opacity-100 hover:bg-[var(--bg)]"}
              `}
            >
              <Icon size={18} className="min-w-[18px]" />
              {(!collapsed || isMobile) && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--border)]">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-[13px] text-red-500 hover:bg-red-500/10">
            <LogOut size={18} className="min-w-[18px]" />
            {(!collapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <header className="h-[60px] bg-[var(--card)] border-b border-[var(--border)] flex items-center px-4 gap-3">
          <button onClick={toggleSidebar} className="p-1.5 rounded-md opacity-60 hover:opacity-100 hover:bg-[var(--bg)]">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="flex-1 text-[15px] font-medium">Student Portal</span>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} title="Home"
              className="p-1.5 rounded-md opacity-60 hover:opacity-100 hover:bg-[var(--bg)] transition-all">
              <Home size={18} />
            </button>
            <button onClick={handleLogout} title="Logout"
              className="p-1.5 rounded-md opacity-60 hover:opacity-100 hover:bg-[var(--bg)] hover:text-red-500 transition-all">
              <LogOut size={18} />
            </button>
            <NotificationBell />
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-medium">
              {initials}
            </div>
          </div>
        </header>

        <main className={`portal-main flex-1 overflow-y-auto p-5 ${isStudyZone ? "study-zone" : ""}`}>
          <Suspense fallback={<PageLoading />}>
            <PageTransition />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
