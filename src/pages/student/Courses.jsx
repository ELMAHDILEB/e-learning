import { useNavigate } from "react-router-dom";
import { BookOpen, BarChart3 } from "lucide-react";
import { COURSES_DATA } from "../../data/courseData";


const StudentCourses = () => {
  const navigate = useNavigate();

  const handleContinue = (courseId, lessonId = 1) => {
    // Navigate to course lesson page
    navigate(`/student/course/${courseId}/lesson/${lessonId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">
          My Courses
        </h1>
        <p className="text-[var(--text)] opacity-60">
          Continue learning where you left off
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES_DATA.map((course) => (
          <div
            key={course.id}
            className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Course Image */}
            <div className="relative h-40 bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <BookOpen size={48} className="text-white opacity-30" />
            </div>

            {/* Course Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-lg font-bold text-[var(--text)] mb-2">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--text)] opacity-60 mb-4">
                {course.description}
              </p>

              {/* Instructor */}
              <p className="text-xs text-[var(--text)] opacity-50 mb-4">
                Instructor: {course.instructor}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1">
                  <BookOpen size={14} className="text-cyan-500" />
                  <span className="text-[var(--text)] opacity-60">
                    {course.completedLessons} / {course.totalLessons}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 size={14} className="text-green-500" />
                  <span className="text-[var(--text)] opacity-60">
                    {course.progress}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 bg-[var(--bg)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[var(--text)] opacity-50 mt-1">
                  {course.progress}% Complete
                </p>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => handleContinue(course.id)}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>▶</span>
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {COURSES_DATA.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto mb-4 text-[var(--text)] opacity-30" />
          <p className="text-[var(--text)] opacity-60">
            You haven't enrolled in any courses yet
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
