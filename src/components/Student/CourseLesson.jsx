import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, BookOpen } from "lucide-react";
import { getCourseById, getLessonById } from "../../data/courseData";
import { useState } from "react";


const CourseLesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Get course and lesson data
  const course = getCourseById(courseId);
  const lesson = getLessonById(courseId, lessonId);

  if (!course || !lesson) {
    return (
      <div className="p-6 text-center">
        <p className="text-[var(--text)] opacity-60">Course or lesson not found</p>
      </div>
    );
  }

  // Get current lesson index
  const currentLessonIndex = course.lessons.findIndex(
    (l) => l.id === lesson.id
  );
  const isLastLesson = currentLessonIndex === course.lessons.length - 1;
  const isFirstLesson = currentLessonIndex === 0;
  
  // Check if lesson is completed
  const lessonKey = `${courseId}-${lessonId}`;
  const isCompleted = completedLessons[lessonKey] || lesson.completed;

  const handlePreviousLesson = () => {
    if (!isFirstLesson) {
      const prevLesson = course.lessons[currentLessonIndex - 1];
      navigate(`/student/course/${courseId}/lesson/${prevLesson.id}`);
    }
  };

  const handleNextLesson = () => {
    if (!isLastLesson) {
      const nextLesson = course.lessons[currentLessonIndex + 1];
      navigate(`/student/course/${courseId}/lesson/${nextLesson.id}`);
    }
  };

  const handleMarkComplete = () => {
    setCompletedLessons({
      ...completedLessons,
      [lessonKey]: true,
    });
    setSuccessMessage("✓ Lesson marked as complete!");
    
    // Hide message after 2 seconds
    setTimeout(() => setSuccessMessage(""), 2000);
    
    // Auto go to next lesson after 1.5 seconds
    if (!isLastLesson) {
      setTimeout(() => {
        handleNextLesson();
      }, 1500);
    }
  };

  const handleBackToCourse = () => {
    navigate("/student/courses");
  };

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      {/* Header */}
      <div className="bg-[var(--card)] border-b border-[var(--border)] p-4">
        <button
          onClick={handleBackToCourse}
          className="flex items-center gap-2 text-cyan-500 hover:text-cyan-600 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Courses
        </button>
        <div>
          <p className="text-sm text-[var(--text)] opacity-60 mb-1">
            {course.title}
          </p>
          <h1 className="text-2xl font-bold text-[var(--text)]">
            {lesson.title}
          </h1>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 mx-6 mt-6 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
        {/* Main Video Area */}
        <div className="lg:col-span-3">
          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden mb-6">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={lesson.videoUrl}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
                  {lesson.title}
                </h2>
                <p className="text-[var(--text)] opacity-60">
                  {lesson.description}
                </p>
              </div>
              {isCompleted && (
                <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
              )}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-cyan-500" />
                <span className="text-[var(--text)] opacity-60">
                  Duration: {lesson.duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-cyan-500" />
                <span className="text-[var(--text)] opacity-60">
                  Lesson {currentLessonIndex + 1} of {course.lessons.length}
                </span>
              </div>
            </div>
          </div>

          {/* Lesson Navigation */}
          <div className="flex gap-4">
            <button
              onClick={handlePreviousLesson}
              disabled={isFirstLesson}
              className="flex-1 px-4 py-3 border border-[var(--border)] text-[var(--text)] rounded-lg hover:bg-[var(--bg)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous Lesson
            </button>
            {!isCompleted && (
              <button 
                onClick={handleMarkComplete}
                className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
              >
                ✓ Mark as Complete
              </button>
            )}
            <button
              onClick={handleNextLesson}
              disabled={isLastLesson}
              className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Next Lesson →
            </button>
          </div>
        </div>

        {/* Sidebar - Lessons List */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 h-fit">
          <h3 className="font-bold text-[var(--text)] mb-4">
            Course Lessons ({course.completedLessons}/{course.totalLessons})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {course.lessons.map((l, index) => {
              const lKey = `${courseId}-${l.id}`;
              const lCompleted = completedLessons[lKey] || l.completed;
              
              return (
                <button
                  key={l.id}
                  onClick={() => navigate(`/student/course/${courseId}/lesson/${l.id}`)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    l.id === lesson.id
                      ? "bg-cyan-500/20 border-l-2 border-cyan-500"
                      : "hover:bg-[var(--bg)]"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      {lCompleted ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-[var(--border)] rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--text)] truncate">
                        Lesson {index + 1}
                      </p>
                      <p className="text-xs text-[var(--text)] opacity-60 line-clamp-2">
                        {l.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Course Progress */}
          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text)] opacity-60 mb-2">
              Course Progress
            </p>
            <div className="h-2 bg-[var(--bg)] rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-[var(--text)]">
              {course.progress}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;