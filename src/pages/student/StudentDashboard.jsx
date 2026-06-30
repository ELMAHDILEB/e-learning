import StudentStatsCards from "../../components/Student/dashboard/StudentStatsCards";
import ContinueLearning from "../../components/Student/dashboard/ContinueLearning";
import WeeklyStudyChart from "../../components/Student/dashboard/WeeklyStudyChart";
import UpcomingLessons from "../../components/Student/dashboard/UpcomingLessons";
import RecommendedCourses from "../../components/Student/dashboard/RecommendedCourses";

const stats = [
  {
    title: "Enrolled Courses",
    value: 8,
    color: "cyan",
  },
  {
    title: "Completed Courses",
    value: 5,
    color: "green",
  },
  {
    title: "Certificates",
    value: 3,
    color: "amber",
  },
  {
    title: "Study Hours",
    value: "126h",
    color: "purple",
  },
];

const courses = [
  {
    id: 1,
    title: "React.js Masterclass",
    progress: 75,
    lessons: "15 / 20 Lessons",
  },
  {
    id: 2,
    title: "Node.js API",
    progress: 48,
    lessons: "12 / 25 Lessons",
  },
  {
    id: 3,
    title: "MongoDB Basics",
    progress: 22,
    lessons: "4 / 18 Lessons",
  },
];

const weeklyStudy = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 1 },
  { day: "Thu", hours: 3 },
  { day: "Fri", hours: 2 },
  { day: "Sat", hours: 5 },
  { day: "Sun", hours: 4 },
];

const lessons = [
  {
    id: 1,
    title: "React Hooks",
    date: "Tomorrow - 10:00 AM",
  },
  {
    id: 2,
    title: "Node Authentication",
    date: "Friday - 02:00 PM",
  },
  {
    id: 3,
    title: "MongoDB Aggregation",
    date: "Saturday - 11:30 AM",
  },
];

const recommended = [
  {
    id: 1,
    title: "Docker Essentials",
    level: "Beginner",
  },
  {
    id: 2,
    title: "TypeScript Bootcamp",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Next.js Complete Guide",
    level: "Advanced",
  },
];

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <StudentStatsCards stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ContinueLearning courses={courses} />
        </div>

        <WeeklyStudyChart data={weeklyStudy} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <UpcomingLessons lessons={lessons} />

        <RecommendedCourses courses={recommended} />
      </div>
    </div>
  );
};

export default StudentDashboard;