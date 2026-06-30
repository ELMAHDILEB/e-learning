import { PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContinueLearning = ({ courses }) => {
  const navigate = useNavigate();

  const handleContinue = (courseId) => {
    navigate(`/student/course/${courseId}/lesson/1`);
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Continue Learning</h2>

        <button 
          onClick={() => navigate("/student/courses")}
          className="text-cyan-500 text-sm hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-[var(--border)] rounded-xl p-4 hover:border-cyan-500 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-base">
                  {course.title}
                </h3>

                <p className="text-sm opacity-60 mt-1">
                  {course.lessons}
                </p>
              </div>

              <button 
                onClick={() => handleContinue(course.id)}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition"
              >
                <PlayCircle size={18} />
                Continue
              </button>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-[var(--bg)] overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${course.progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueLearning;