import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";


import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import StudentLayout from "../layouts/StudentLayout.jsx";
import CourseLesson from "../components/Student/CourseLesson.jsx";
import Certificates from "../pages/student/Certificates.jsx";


// import ProtectedRoute from "../components/Auth/ProtectedRoute.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/auth/Login.jsx"));
const Register = lazy(() => import("../pages/auth/Register.jsx"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword.jsx"));
const GoogleCallback = lazy(() => import("../pages/auth/GoogleCallback.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const PageNotFound = lazy(() => import("../pages/PageNotFound.jsx"));

/*admin pages*/
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const Profile = lazy(() => import("../pages/admin/Profile.jsx"));
const Users = lazy(() => import("../pages/admin/Users.jsx"));
const Course = lazy(() => import("../pages/admin/Courses.jsx"));
const Lessons = lazy(()=> import("../pages/admin/Lessons.jsx"));
const Chat = lazy(()=> import("../pages/admin/Chat.jsx"));




/*student pages*/
const StudentDashboard = lazy(() => import("../pages/student/StudentDashboard.jsx"));
const StudentCourses = lazy(()=> import("../pages/student/Courses.jsx"));
const StudentLessons = lazy(()=> import("../pages/student/Lessons.jsx"));
const StudentProfile = lazy(()=> import("../pages/student/Profile.jsx"));
const StudentChat = lazy(()=> import("../pages/student/Chat.jsx")) ;

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/callback",
        element: <GoogleCallback />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      { path: "*", 
        element: <PageNotFound /> },
    ],
  },

  {
    path: "/admin",
    element: (
      // <ProtectedRoute roles={["admin", "teacher"]}>
        <AdminLayout />
      // </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <Course /> },
      { path: "courses/:id/lessons", element: <Lessons /> },
      { path: "profile", element: <Profile /> },
      { path: "chat", element: <Chat /> }
    ],
  },
 {
  path: "/student",
  element: (
    // <ProtectedRoute roles={["student"]}>
    <StudentLayout />
    // </ProtectedRoute>
  ),
   children: [
      { index: true, element: <StudentDashboard /> },
      
      { path: "courses", element: <StudentCourses /> },
      
      { path: "course/:courseId/lesson/:lessonId", element: <CourseLesson /> },
      
      { path: "courses/:id/lessons", element: <StudentLessons /> },
      
      { path: "certificates", element: <Certificates /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "chat", element: <StudentChat /> },
    ],
},
]);

export default router;
