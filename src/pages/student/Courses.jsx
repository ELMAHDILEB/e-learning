import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Users, Lock } from "lucide-react";
import PageLoading from "../../components/UI/PageLoading.jsx";
import { getStudentCourses } from "../../services/dashboard";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentCourses()
      .then(({ data }) => setCourses(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoading lines={6} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-medium">Available Courses</h1>
        <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">{courses.length} published courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/student/courses/${course.id}`}
            className="ui-card bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-cyan-500/50 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <BookOpen size={18} className="text-cyan-500" />
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500">{course.category}</span>
            </div>
            <h3 className="text-sm font-medium group-hover:text-cyan-500 transition-colors">{course.title}</h3>
            <p className="text-xs text-[var(--text)] opacity-50 mt-1 line-clamp-2">{course.content}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-[var(--text)] opacity-50">
              <span className="flex items-center gap-1"><Users size={12} /> {course.teacher?.name}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {course.lessons?.length ?? 0} lessons</span>
            </div>
            {course.enrolled && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="opacity-50">Progress</span>
                  <span className="text-cyan-500">{course.progress_percent ?? 0}%</span>
                </div>
                <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full progress-bar-fill" style={{ width: `${course.progress_percent ?? 0}%` }} />
                </div>
              </div>
            )}
            {!course.enrolled && (
              <span className="inline-flex items-center gap-1 mt-3 text-xs text-[var(--text)] opacity-40">
                <Lock size={10} /> Enroll to start
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
