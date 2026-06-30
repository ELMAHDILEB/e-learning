import { CalendarDays, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { COURSES_DATA } from "../../../data/courseData";

const UpcomingLessons = () => {
  const navigate = useNavigate();

  const getUpcomingLessons = () => {
    const lessons = [];
    COURSES_DATA.forEach((course) => {
      course.lessons.slice(0, 2).forEach((lesson, index) => {
        lessons.push({
          id: `${course.id}-${lesson.id}`,
          title: lesson.title,
          date: `Dec ${15 + index}, 2024`,
          duration: lesson.duration,
          courseId: course.id,
          lessonId: lesson.id,
          courseName: course.title,
        });
      });
    });
    return lessons.slice(0, 3); 
  };

  const upcomingLessons = getUpcomingLessons();

  const handleJoin = (lesson) => {
    navigate(`/student/course/${lesson.courseId}/lesson/${lesson.lessonId}`);
  };

  const handleViewSchedule = () => {
    navigate("/student/courses");
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Upcoming Lessons
        </h2>

        <button 
          onClick={handleViewSchedule}
          className="text-cyan-500 text-sm hover:underline"
        >
          View Schedule
        </button>
      </div>

      <div className="space-y-4">
        {upcomingLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between border border-[var(--border)] rounded-xl p-4 hover:border-cyan-500 transition"
          >
            <div>
              <h3 className="font-medium">{lesson.title}</h3>
              <p className="text-xs opacity-50 mt-1">{lesson.courseName}</p>

              <div className="flex items-center gap-4 mt-2 text-sm opacity-70">
                <span className="flex items-center gap-1">
                  <CalendarDays size={15} />
                  {lesson.date}
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={15} />
                  {lesson.duration}
                </span>
              </div>
            </div>

            <button 
              onClick={() => handleJoin(lesson)}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition flex-shrink-0"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingLessons;