import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, ClipboardList } from "lucide-react";
import { getStudentLesson } from "../../services/lessons";
import AiAssistant from "../../components/Student/AiAssistant";
import LessonContent from "../../components/Student/LessonContent";

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getStudentLesson(parseInt(lessonId))
      .then(({ data }) => setLesson(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load lesson."))
      .finally(() => setLoading(false));
  }, [lessonId]);

  if (loading) {
    return <p className="text-sm text-[var(--text)] opacity-50">Loading lesson...</p>;
  }

  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-red-500">{error}</p>
        <button onClick={() => navigate(`/student/courses/${courseId}`)}
          className="text-sm text-cyan-500 hover:underline w-fit">Back to course</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/student/courses/${courseId}`)}
          className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] opacity-60 hover:opacity-100">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-medium">{lesson.title}</h1>
          <p className="text-xs text-[var(--text)] opacity-50 flex items-center gap-1 mt-0.5">
            <Clock size={12} /> {lesson.duration} min · {lesson.course?.title}
          </p>
        </div>
      </div>

      <div className="no-motion bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
        <LessonContent
          content={lesson.content}
          videoUrl={lesson.video_url}
          fileUrl={lesson.file_url}
          duration={lesson.duration}
        />
      </div>

      {lesson.quiz && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <ClipboardList size={18} className="text-cyan-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Lesson Quiz</p>
              <p className="text-xs text-[var(--text)] opacity-50">{lesson.quiz.timer_minutes} min · Pass: {lesson.quiz.pass_score}%</p>
            </div>
          </div>
          <Link to={`/student/courses/${courseId}/lessons/${lessonId}/quiz`}
            className="px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium">
            Take Quiz
          </Link>
        </div>
      )}
      <AiAssistant lessonId={parseInt(lessonId)} lessonTitle={lesson.title} />
    </div>
  );
};

export default LessonView;
