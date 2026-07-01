import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import StudentLayout from "../layouts/StudentLayout.jsx";
import ProtectedRoute from "../components/Auth/ProtectedRoute.jsx";
import GuestRoute from "../components/Auth/GuestRoute.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/auth/Login.jsx"));
const Register = lazy(() => import("../pages/auth/Register.jsx"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword.jsx"));
const GoogleCallback = lazy(() => import("../pages/auth/GoogleCallback.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const PageNotFound = lazy(() => import("../pages/PageNotFound.jsx"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const Profile = lazy(() => import("../pages/admin/Profile.jsx"));
const Users = lazy(() => import("../pages/admin/Users.jsx"));
const Course = lazy(() => import("../pages/admin/Courses.jsx"));
const Lessons = lazy(() => import("../pages/admin/Lessons.jsx"));
const Chat = lazy(() => import("../pages/admin/Chat.jsx"));
const StudentPerformance = lazy(() => import("../pages/admin/StudentPerformance.jsx"));
const Permissions = lazy(() => import("../pages/admin/Permissions.jsx"));
const StudentDashboard = lazy(() => import("../pages/student/Dashboard.jsx"));
const StudentCourses = lazy(() => import("../pages/student/Courses.jsx"));
const CourseDetail = lazy(() => import("../pages/student/CourseDetail.jsx"));
const LessonView = lazy(() => import("../pages/student/LessonView.jsx"));
const QuizPage = lazy(() => import("../pages/student/QuizPage.jsx"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <GuestRoute><Login /></GuestRoute> },
      { path: "/register", element: <GuestRoute><Register /></GuestRoute> },
      { path: "/forgot-password", element: <GuestRoute><ForgotPassword /></GuestRoute> },
      { path: "/auth/callback", element: <GoogleCallback /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["admin", "teacher"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <Users /> },
      { path: "permissions", element: <Permissions /> },
      { path: "courses", element: <Course /> },
      { path: "courses/:id/lessons", element: <Lessons /> },
      { path: "students", element: <StudentPerformance /> },
      { path: "profile", element: <Profile /> },
      { path: "chat", element: <Chat /> },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute roles={["student"]}>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "courses", element: <StudentCourses /> },
      { path: "courses/:id", element: <CourseDetail /> },
      { path: "courses/:courseId/lessons/:lessonId", element: <LessonView /> },
      { path: "courses/:courseId/lessons/:lessonId/quiz", element: <QuizPage /> },
      { path: "profile", element: <Profile /> },
      { path: "chat", element: <Chat /> },
    ],
  },
]);

export default router;
