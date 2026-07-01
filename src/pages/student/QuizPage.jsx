import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import { getStudentLessonQuiz, submitQuiz } from "../../services/lessons";

const QuizPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getStudentLessonQuiz(parseInt(lessonId))
      .then(({ data }) => {
        setQuiz(data);
        setTimeLeft(data.timer_minutes * 60);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load quiz."))
      .finally(() => setLoading(false));
  }, [lessonId]);

  const handleSubmit = useCallback(async () => {
    if (!quiz || submitting) return;
    setSubmitting(true);
    try {
      const { data } = await submitQuiz(quiz.id, answers);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit quiz.");
    } finally {
      setSubmitting(false);
    }
  }, [quiz, answers, submitting]);

  useEffect(() => {
    if (!timeLeft || result) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, result, handleSubmit]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return <p className="text-sm text-[var(--text)] opacity-50">Loading quiz...</p>;
  }

  if (error && !quiz) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-red-500">{error}</p>
        <button onClick={() => navigate(`/student/courses/${courseId}`)} className="text-sm text-cyan-500 hover:underline w-fit">
          Back to course
        </button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto py-8">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${result.passed ? "bg-green-500/10" : "bg-red-500/10"}`}>
          {result.passed ? <CheckCircle size={32} className="text-green-500" /> : <XCircle size={32} className="text-red-500" />}
        </div>
        <h2 className="text-lg font-medium">{result.passed ? "Quiz Passed!" : "Quiz Failed"}</h2>
        <p className="text-sm text-[var(--text)] opacity-70 text-center">{result.message}</p>
        <div className="text-3xl font-bold text-cyan-500">{result.score}%</div>
        <p className="text-xs text-[var(--text)] opacity-50">{result.correct}/{result.total} correct · Pass score: {result.pass_score}%</p>
        <div className="flex gap-3 mt-2">
          {!result.passed && (
            <button onClick={() => { setResult(null); setAnswers({}); setTimeLeft(quiz.timer_minutes * 60); }}
              className="px-4 py-2 text-sm rounded-lg border border-[var(--border)] hover:bg-[var(--bg)]">
              Retry Quiz
            </button>
          )}
          <button onClick={() => navigate(`/student/courses/${courseId}`)}
            className="px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white">
            {result.passed ? "Continue Course" : "Back to Course"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/student/courses/${courseId}/lessons/${lessonId}`)}
          className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] opacity-60 hover:opacity-100">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-medium">{quiz.title}</h1>
          <p className="text-xs text-[var(--text)] opacity-50">{quiz.questions?.length} questions · Pass: {quiz.pass_score}%</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${timeLeft <= 60 ? "bg-red-500/10 text-red-500" : "bg-[var(--card)] border border-[var(--border)]"}`}>
          <Clock size={14} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {quiz.questions?.map((question, qi) => (
          <div key={question.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <p className="text-sm font-medium mb-3">{qi + 1}. {question.content}</p>
            <div className="flex flex-col gap-2">
              {question.options?.map((option) => (
                <label key={option}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer transition-colors
                    ${answers[question.id] === option ? "border-cyan-500 bg-cyan-500/10" : "border-[var(--border)] hover:bg-[var(--bg)]"}`}>
                  <input type="radio" name={`q-${question.id}`} value={option}
                    checked={answers[question.id] === option}
                    onChange={() => setAnswers((a) => ({ ...a, [question.id]: option }))}
                    className="accent-cyan-500" />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} disabled={submitting || Object.keys(answers).length < quiz.questions?.length}
        className="px-4 py-2.5 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium disabled:opacity-50 self-end">
        {submitting ? "Submitting..." : "Submit Quiz"}
      </button>
    </div>
  );
};

export default QuizPage;
