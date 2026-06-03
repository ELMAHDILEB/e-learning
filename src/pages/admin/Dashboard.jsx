import { Users, BookOpen, GraduationCap, DollarSign } from "lucide-react";
import StatsCards from "../../components/Admin/dashboard/StatsCards";
import EnrollmentChart from "../../components/Admin/dashboard/EnrollmentChart";
import CategoryChart from "../../components/Admin/dashboard/CategoryChart";
import WeeklyUsersChart from "../../components/Admin/dashboard/WeeklyUsersChart";


const stats = [
  { label: "Total Users", value: "2,847", trend: "+12%", up: true, icon: Users, color: "cyan" },
  { label: "Total Courses", value: "134", trend: "+5%", up: true, icon: BookOpen, color: "green" },
  { label: "Total Students", value: "1,923", trend: "+18%", up: true, icon: GraduationCap, color: "amber" },
  { label: "Revenue", value: "$48.2k", trend: "-3%", up: false, icon: DollarSign, color: "purple" },
];

const enrollData = [
  { month: "Jan", enrollments: 320, revenue: 12 },
  { month: "Feb", enrollments: 410, revenue: 16 },
  { month: "Mar", enrollments: 380, revenue: 14 },
  { month: "Apr", enrollments: 520, revenue: 19 },
  { month: "May", enrollments: 490, revenue: 18 },
  { month: "Jun", enrollments: 610, revenue: 22 },
];

const categoryData = [
  { name: "Development", value: 38 },
  { name: "Design", value: 24 },
  { name: "Business", value: 21 },
  { name: "Marketing", value: 17 },
];

const weeklyUsers = [
  { week: "W1", users: 42 }, { week: "W2", users: 67 },
  { week: "W3", users: 55 }, { week: "W4", users: 80 },
  { week: "W5", users: 73 }, { week: "W6", users: 91 },
  { week: "W7", users: 85 }, { week: "W8", users: 110 },
];

const AdminDashboard = () => (
  <div className="flex flex-col gap-5">
    <StatsCards stats={stats} />
    <EnrollmentChart data={enrollData} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CategoryChart data={categoryData} />
      <WeeklyUsersChart data={weeklyUsers} />
    </div>
  </div>
);

export default AdminDashboard;