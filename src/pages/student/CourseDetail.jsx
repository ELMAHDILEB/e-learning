import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Lock, CheckCircle, PlayCircle } from "lucide-react";
import PageLoading from "../../components/UI/PageLoading.jsx";
import { getStudentCourse, enrollCourse } from "../../services/dashboard";

const LessonRow = ({ lesson, courseId, enrolled }) => (
  <div className="flex items-center gap-3 px-4 py-3">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
      ${lesson.quiz_passed ? "bg-green-500/10 text-green-500" : lesson.unlocked ? "bg-cyan-500/10 text-cyan-500" : "bg-[var(--bg)] text-[var(--text)] opacity-30"}`}>
      {lesson.quiz_passed ? <CheckCircle size={16} /> : lesson.unlocked ? <PlayCircle size={16} /> : <Lock size={14} />}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-medium ${!lesson.unlocked ? "opacity-40" : ""}`}>{lesson.order}. {lesson.title}</p>
      <p className="text-xs text-[var(--text)] opacity-40">{lesson.duration} min {lesson.has_quiz && "· Quiz"}</p>
    </div>
    {enrolled && lesson.unlocked && (
      <Link to={`/student/courses/${courseId}/lessons/${lesson.id}`}
        className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 transition-colors">
        {lesson.quiz_passed ? "Review" : "Start"}
      </Link>
    )}
    {enrolled && !lesson.unlocked && (
      <span className="text-xs text-[var(--text)] opacity-30 flex items-center gap-1">
        <Lock size={10} /> Locked
      </span>
    )}
  </div>
);

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  const fetchCourse = async () => {
    try {
      const { data: d } = await getStudentCourse(parseInt(id));
      setData(d);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourse(); }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await enrollCourse(parseInt(id));
      await fetchCourse();
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <PageLoading lines={5} />;
  }

  if (!data) {
    return <p className="text-sm text-red-500">Course not found.</p>;
  }

  const { course, enrolled, chapters = [], uncategorized_lessons = [], lessons, progress_percent } = data;
  const hasChapters = chapters.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/student/courses")}
          className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] opacity-60 hover:opacity-100">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-medium">{course.title}</h1>
          <p className="text-xs text-[var(--text)] opacity-50">{course.teacher?.name} · {course.category}</p>
        </div>
        {!enrolled && (
          <button onClick={handleEnroll} disabled={enrolling}
            className="px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium disabled:opacity-50">
            {enrolling ? "Joining..." : "Join Course"}
          </button>
        )}
      </div>

      {enrolled && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Course Progress</span>
            <span className="text-cyan-500 font-medium">{progress_percent}%</span>
          </div>
          <div className="h-2 bg-[var(--bg)] rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${progress_percent}%` }} />
          </div>
        </div>
      )}

      <p className="text-sm text-[var(--text)] opacity-70">{course.content}</p>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <h2 className="text-sm font-medium">{hasChapters ? "Course Content" : "Lessons"}</h2>
        </div>

        {hasChapters ? (
          <div className="divide-y divide-[var(--border)]">
            {chapters.map((chapter) => (
              <div key={chapter.id}>
                <div className="px-4 py-2.5 bg-[var(--bg)]/50">
                  <p className="text-xs font-medium text-cyan-500">
                    Chapter {chapter.order}: {chapter.title}
                  </p>
                  <p className="text-[10px] opacity-40 mt-0.5">{chapter.lessons?.length || 0} lessons</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {(chapter.lessons || []).map((lesson) => (
                    <LessonRow key={lesson.id} lesson={lesson} courseId={id} enrolled={enrolled} />
                  ))}
                </div>
              </div>
            ))}
            {uncategorized_lessons.length > 0 && (
              <div>
                <div className="px-4 py-2.5 bg-[var(--bg)]/50">
                  <p className="text-xs font-medium opacity-60">Other Lessons</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {uncategorized_lessons.map((lesson) => (
                    <LessonRow key={lesson.id} lesson={lesson} courseId={id} enrolled={enrolled} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {lessons.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} courseId={id} enrolled={enrolled} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
