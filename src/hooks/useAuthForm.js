import { useState } from "react";
import handleValidateForm from "../utils/validators";

export default function useAuthForm(mode) {
  const [errors, setErrors] = useState({});

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

    // API CALL
    // *********
    // *********
    // *********
    // *********
    // *********
  };

  return {
    handleSubmit,
    errors,
  };
}
