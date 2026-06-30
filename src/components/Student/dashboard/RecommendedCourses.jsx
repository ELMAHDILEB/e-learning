import { BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecommendedCourses = ({ courses }) => {
  const navigate = useNavigate();

  const handleEnroll = (courseId) => {
    // Navigate to first lesson of the course
    navigate(`/student/course/${courseId}/lesson/1`);
  };

  const handleBrowseAll = () => {
    // Navigate to My Courses page
    navigate("/student/courses");
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Recommended Courses
        </h2>

        <button 
          onClick={handleBrowseAll}
          className="text-cyan-500 text-sm hover:underline"
        >
          Browse All
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between border border-[var(--border)] rounded-xl p-4 hover:border-cyan-500 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <BookOpen
                  size={22}
                  className="text-cyan-500"
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  {course.title}
                </h3>

                <p className="text-sm opacity-60">
                  {course.level}
                </p>
              </div>
            </div>

            <button 
              onClick={() => handleEnroll(course.id)}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition"
            >
              Enroll
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;