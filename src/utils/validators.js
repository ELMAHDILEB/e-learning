const handleValidateForm = (data, type = "register") => {
  const errors = {};
  let labels = {};

  switch (type) {
    case "register":
      labels = {
        username: "Username",
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        password: "Password",
      };
      break;

    case "login":
      labels = {
        email: "Email",
        password: "Password",
      };
      break;

    case "forgotPassword":
      labels = {
        email: "Email",
      };
      break;

    default:
      labels = {};
  }

  const rules = [
    {
      field: "email",
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format",
    },
  ];

  if (type === "register" || type === "login") {
    rules.push({
      field: "password",
      regex: /^.{8,}$/,
      message: "Password must be at least 8 characters",
    });
  }

  if (type === "register") {
    rules.push(
      {
        field: "username",
        regex: /^[A-Za-z0-9]{8,}$/,
        message:
          "Username must be at least 8 characters and contain only letters and numbers",
      },
      {
        field: "firstName",
        regex: /^[A-Za-z\s'-]+$/,
        message: "First name can contain only letters",
      },
      {
        field: "lastName",
        regex: /^[A-Za-z\s'-]+$/,
        message: "Last name can contain only letters",
      }
    );
  }

  Object.keys(labels).forEach((field) => {
    if (!(data[field] || "").trim()) {
      errors[field] = `${labels[field]} is required`;
    }
  });

  rules.forEach((rule) => {
    const value = data[rule.field]?.trim();

    if (
      value &&
      !errors[rule.field] &&
      !rule.regex.test(value)
    ) {
      errors[rule.field] = rule.message;
    }
  });

  return errors;
};

export default handleValidateForm;