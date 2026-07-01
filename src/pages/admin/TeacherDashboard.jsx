import { useState, useEffect } from "react";
import { Users, BookOpen, GraduationCap, Target } from "lucide-react";
import StatsCards from "../../components/Admin/dashboard/StatsCards";
import { getDashboard } from "../../services/dashboard";

const TeacherDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard().then(({ data }) => setStats(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm opacity-50">Loading dashboard...</p>;

  const cards = [
    { label: "My Courses", value: String(stats?.total_courses ?? 0), trend: "", up: true, icon: BookOpen, color: "cyan" },
    { label: "Students", value: String(stats?.total_students ?? 0), trend: "", up: true, icon: Users, color: "green" },
    { label: "Enrollments", value: String(stats?.total_enrollments ?? 0), trend: "", up: true, icon: GraduationCap, color: "amber" },
    { label: "Avg Quiz Score", value: `${stats?.average_score ?? 0}%`, trend: "", up: true, icon: Target, color: "purple" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-medium">Teacher Dashboard</h1>
        <p className="text-xs opacity-50 mt-0.5">Your courses and student overview</p>
      </div>
      <StatsCards stats={cards} />
      {stats?.courses?.length > 0 && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <h2 className="text-sm font-medium">My Courses</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Course", "Category", "Students", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-2 text-xs opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.courses.map((c) => (
                <tr key={c.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500">{c.category}</span></td>
                  <td className="px-4 py-3">{c.enrollments_count ?? 0}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "Published" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
