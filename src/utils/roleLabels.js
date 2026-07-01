export const getRoleLabel = (roleName) => {
  if (roleName === "admin") return "Administrator";
  if (roleName === "teacher") return "Teacher";
  if (roleName === "student") return "Student";
  return roleName || "User";
};

export const ROLE_UI_LABELS = {
  Admin: "Administrator",
  Instructor: "Teacher",
  Teacher: "Teacher",
  Student: "Student",
};

export const ACADEMIC_CATEGORIES = [
  "All",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Languages",
  "Humanities",
  "Engineering",
];
