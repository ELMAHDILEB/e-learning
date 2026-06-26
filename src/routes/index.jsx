import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";


import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";  

const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/auth/Login.jsx"));
const Register = lazy(() => import("../pages/auth/Register.jsx"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const PageNotFound = lazy(() => import("../pages/PageNotFound.jsx"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const Profile = lazy(() => import("../pages/admin/Profile.jsx"));
const Users = lazy(() => import("../pages/admin/Users.jsx"));
const Course = lazy(() => import("../pages/admin/Courses.jsx"));
const Lessons = lazy(()=> import("../pages/admin/Lessons.jsx"));
const Chat = lazy(()=> import("../pages/admin/Chat.jsx"));
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
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <Course /> },
      { path: "courses/:id/lessons", element: <Lessons /> },
      { path: "profile", element: <Profile /> },
      { path: "chat", element: <Chat /> }
    ],
  },
]);

export default router;
