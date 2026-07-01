import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleValidateForm from "../utils/validators";
import { login, register, getDashboardPath } from "../services/auth";
import { useAuth } from "../context/AuthProvider";

const parseApiErrors = (error) => {
  const data = error?.response?.data;

  if (data?.errors) {
    const fieldErrors = {};
    Object.entries(data.errors).forEach(([field, messages]) => {
      fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages;
    });
    return fieldErrors;
  }

  if (data?.message) {
    return { general: data.message };
  }

  return { general: "Something went wrong. Please try again." };
};

export default function useAuthForm(mode) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const validationErrors = handleValidateForm(data, mode);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (mode === "login") {
        const { data: response } = await login({
          email: data.email,
          password: data.password,
        });

        loginSuccess(response.token, response.user);
        navigate(getDashboardPath(response.user));
        return;
      }

      if (mode === "register") {
        const { data: response } = await register({
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          password: data.password,
        });

        loginSuccess(response.token, response.user);
        navigate(getDashboardPath(response.user));
        return;
      }

      if (mode === "forgotPassword") {
        const { forgotPassword } = await import("../services/contact");
        const { data: response } = await forgotPassword(data.email);
        setErrors({ general: response.message });
      }
    } catch (error) {
      setErrors(parseApiErrors(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    errors,
    loading,
  };
}
