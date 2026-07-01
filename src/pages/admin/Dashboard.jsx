import { useState, useEffect } from "react";
import { Users, BookOpen, GraduationCap, Target } from "lucide-react";
import StatsCards from "../../components/Admin/dashboard/StatsCards";
import EnrollmentChart from "../../components/Admin/dashboard/EnrollmentChart";
import CategoryChart from "../../components/Admin/dashboard/CategoryChart";
import WeeklyUsersChart from "../../components/Admin/dashboard/WeeklyUsersChart";
import { getDashboard } from "../../services/dashboard";
import { useAuth } from "../../context/AuthProvider";
import TeacherDashboard from "./TeacherDashboard";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard().then(({ data }) => setStats(data)).catch(() => setStats(null)).finally(() => setLoading(false));
  }, []);

  if (user?.role?.name === "teacher") {
    return <TeacherDashboard />;
  }

  if (loading) return <p className="text-sm opacity-50">Loading dashboard...</p>;

  const cards = [
    { label: "Total Users", value: String(stats?.total_users ?? 0), trend: "", up: true, icon: Users, color: "cyan" },
    { label: "Total Courses", value: String(stats?.total_courses ?? 0), trend: "", up: true, icon: BookOpen, color: "green" },
    { label: "Total Students", value: String(stats?.total_students ?? 0), trend: "", up: true, icon: GraduationCap, color: "amber" },
    { label: "Avg Quiz Score", value: `${stats?.average_quiz_score ?? 0}%`, trend: "", up: true, icon: Target, color: "purple" },
  ];

  const categoryData = stats?.courses_by_category ? Object.entries(stats.courses_by_category).map(([name, value]) => ({ name, value })) : [];
  const enrollData = stats?.enrollment_trend?.length ? stats.enrollment_trend.map((e) => ({ month: e.month, enrollments: e.enrollments })) : [{ month: "N/A", enrollments: 0 }];
  const weeklyUsers = stats?.weekly_users?.length ? stats.weekly_users : [{ week: "W1", users: 0 }];

  return (
    <div className="flex flex-col gap-5">
      <StatsCards stats={cards} />
      <EnrollmentChart data={enrollData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategoryChart data={categoryData.length ? categoryData : [{ name: "None", value: 1 }]} />
        <WeeklyUsersChart data={weeklyUsers} />
      </div>
    </div>
  );
};

export default AdminDashboard;
