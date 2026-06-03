import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Contact from "../pages/Contact.jsx";
import About from "../pages/About.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import AdminDashboard from "../pages/admin/Dashboard.jsx";
import CreateCourse from "../pages/admin/CreateCourse.jsx";
import Profile from "../pages/admin/Profile.jsx";
import Users from "../pages/admin/Users.jsx";
import Course from "../pages/admin/Courses.jsx";
import EditCourse from "../pages/admin/EditCourse.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";

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
      { path: "create-course", element: <CreateCourse /> },
      { path: "edit-course", element: <EditCourse /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
