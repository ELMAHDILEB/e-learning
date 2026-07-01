import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlusCircle, Pencil, Trash2, ArrowLeft, Search, Clock, GripVertical, ClipboardList } from "lucide-react";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";
import { getLessons, createLesson, updateLesson, deleteLesson, createQuiz } from "../../services/lessons";
import { getCourse } from "../../services/courses";
import { getChapters, createChapter } from "../../services/chapters";
import { generateQuizWithAi, explainLessonWithAi } from "../../services/ai";
import { uploadFile } from "../../services/profile";

const PER_PAGE = 5;
const emptyForm = { title: "", duration: "", content: "", status: "Draft", video_url: "", file_url: "", chapter_id: "" };
const emptyQuizForm = {
  title: "",
  timer_minutes: 10,
  pass_score: 70,
  questions: [{ content: "", options: ["", ""], correct_answer: "" }],
};

const Lessons = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = parseInt(id);

  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [explainModal, setExplainModal] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [explaining, setExplaining] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [quizModal, setQuizModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [quizForm, setQuizForm] = useState(emptyQuizForm);
  const [generatingAi, setGeneratingAi] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [courseRes, lessonsRes, chaptersRes] = await Promise.all([
        getCourse(courseId),
        getLessons(courseId),
        getChapters(courseId),
      ]);
      setCourse(courseRes.data);
      setLessons(lessonsRes.data);
      setChapters(chaptersRes.data);
      setError("");
    } catch {
      setError("Failed to load lessons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [courseId]);

  const { search, setSearch, filtered: searchFiltered } = useSearch(lessons, ["title", "content"]);
  const { page, totalPages, paginated, prevPage, nextPage, resetPage } = usePagination(searchFiltered, PER_PAGE);

  const handleSearch = (e) => { setSearch(e.target.value); resetPage(); };

  const handleAdd = async () => {
    if (!form.title) return;
    try {
      await createLesson(courseId, {
        ...form,
        duration: parseInt(form.duration) || 15,
      });
      setAddModal(false);
      setForm(emptyForm);
      fetchData();
    } catch {
      setError("Failed to create lesson.");
    }
  };

  const openEdit = (lesson) => {
    setEditModal(lesson);
    setForm({ title: lesson.title, duration: lesson.duration, content: lesson.content, status: lesson.status, video_url: lesson.video_url || "", file_url: lesson.file_url || "" });
  };

  const handleEdit = async () => {
    if (!form.title) return;
    try {
      await updateLesson(editModal.id, {
        ...form,
        duration: parseInt(form.duration) || 15,
      });
      setEditModal(null);
      setForm(emptyForm);
      fetchData();
    } catch {
      setError("Failed to update lesson.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLesson(deleteModal.id);
      setDeleteModal(null);
      if (paginated.length === 1 && page > 1) prevPage();
      fetchData();
    } catch {
      setError("Failed to delete lesson.");
    }
  };

  const handleAddChapter = async () => {
    if (!newChapterTitle.trim()) return;
    try {
      await createChapter(courseId, newChapterTitle.trim());
      setNewChapterTitle("");
      fetchData();
    } catch {
      setError("Failed to create chapter.");
    }
  };

  const handleExplain = async (lesson) => {
    setExplainModal(lesson);
    setExplaining(true);
    setExplanation("");
    try {
      const { data } = await explainLessonWithAi(lesson.id);
      setExplanation(data.explanation);
    } catch {
      setExplanation("Failed to generate explanation.");
    } finally {
      setExplaining(false);
    }
  };

  const handleGenerateWithAi = async () => {
    if (!quizModal) return;
    setGeneratingAi(true);
    try {
      const { data } = await generateQuizWithAi(quizModal.id, 3);
      if (data.questions?.length) {
        setQuizForm((f) => ({
          ...f,
          questions: data.questions.map((q) => ({
            content: q.content,
            options: q.options?.length ? q.options : ["", ""],
            correct_answer: q.correct_answer || "",
          })),
        }));
      }
    } catch {
      setError("Failed to generate quiz with AI.");
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleCreateQuiz = async () => {
    if (!quizForm.title || quizForm.questions.some((q) => !q.content || !q.correct_answer)) return;
    try {
      await createQuiz(quizModal.id, {
        title: quizForm.title,
        timer_minutes: quizForm.timer_minutes,
        pass_score: quizForm.pass_score,
        questions: quizForm.questions.map((q) => ({
          content: q.content,
          options: q.options.filter(Boolean),
          correct_answer: q.correct_answer,
          type: q.options.length === 2 ? "true_false" : "multiple_choice",
        })),
      });
      setQuizModal(null);
      setQuizForm(emptyQuizForm);
      fetchData();
    } catch {
      setError("Failed to create quiz.");
    }
  };

  if (loading) {
    return <p className="text-sm text-[var(--text)] opacity-50">Loading lessons...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={() => navigate("/admin/courses")}
          className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] transition-colors text-[var(--text)] opacity-60 hover:opacity-100">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-medium">{course?.title ?? "Course"}</h1>
          <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">
            {course?.teacher?.name ?? ""} · {searchFiltered.length} lessons
          </p>
        </div>
        <button onClick={() => { setForm(emptyForm); setAddModal(true); }}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors">
          <PlusCircle size={15} /> Add Lesson
        </button>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}

      {/* Chapters */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <h2 className="text-sm font-medium mb-3">Chapters</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {chapters.map((ch) => (
            <span key={ch.id} className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              {ch.order}. {ch.title} ({ch.lessons?.length ?? 0} lessons)
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="New chapter title..." value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500" />
          <button onClick={handleAddChapter}
            className="px-3 py-1.5 text-xs rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white">Add Chapter</button>
        </div>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-40" />
        <input type="text" placeholder="Search lessons..." value={search} onChange={handleSearch}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors" />
      </div>

      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["#", "Title", "Chapter", "Content", "Duration", "Status", "Quiz", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--text)] opacity-50 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-[var(--text)] opacity-40">No lessons found</td>
                </tr>
              ) : (
                paginated.map((lesson) => (
                  <tr key={lesson.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-[var(--text)] opacity-40">
                        <GripVertical size={14} />
                        <span className="text-xs">{lesson.order}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{lesson.title}</td>
                    <td className="px-4 py-3 text-xs opacity-50 whitespace-nowrap">
                      {chapters.find((c) => c.id === lesson.chapter_id)?.title || "—"}
                    </td>
                    <td className="px-4 py-3 text-[var(--text)] opacity-50 max-w-[200px] truncate">{lesson.content}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[var(--text)] opacity-60">
                        <Clock size={12} />
                        <span className="text-xs">{lesson.duration} min</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${lesson.status === "Published" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                        {lesson.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {lesson.quiz ? (
                        <span className="text-xs text-green-500">{lesson.quiz.questions?.length ?? 0} questions</span>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <button onClick={() => { setQuizModal(lesson); setQuizForm({ ...emptyQuizForm, title: `${lesson.title} Quiz` }); }}
                            className="flex items-center gap-1 text-xs text-cyan-500 hover:underline">
                            <ClipboardList size={12} /> Add Quiz
                          </button>
                          <button onClick={() => handleExplain(lesson)}
                            className="text-xs text-purple-500 hover:underline text-left">✨ AI Explain</button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(lesson)}
                          className="p-1.5 rounded-md hover:bg-[var(--bg)] text-[var(--text)] opacity-60 hover:opacity-100 transition-all">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => setDeleteModal(lesson)}
                          className="p-1.5 rounded-md hover:bg-red-500/10 text-[var(--text)] opacity-60 hover:text-red-500 hover:opacity-100 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text)] opacity-50">
            Showing {Math.min((page - 1) * PER_PAGE + 1, searchFiltered.length)}–{Math.min(page * PER_PAGE, searchFiltered.length)} of {searchFiltered.length}
          </p>
          <div className="flex gap-2">
            <button onClick={prevPage} disabled={page === 1}
              className="px-3 py-1 text-xs rounded-md border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--bg)] transition-colors">Prev</button>
            <button onClick={nextPage} disabled={page === totalPages}
              className="px-3 py-1 text-xs rounded-md border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--bg)] transition-colors">Next</button>
          </div>
        </div>
      </div>

      {addModal && (
        <Modal title="Add New Lesson" onClose={() => setAddModal(false)} onConfirm={handleAdd} confirmLabel="Add Lesson">
          <LessonForm form={form} chapters={chapters} onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))} />
        </Modal>
      )}
      {editModal && (
        <Modal title="Edit Lesson" onClose={() => setEditModal(null)} onConfirm={handleEdit} confirmLabel="Save Changes">
          <LessonForm form={form} chapters={chapters} onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))} />
        </Modal>
      )}
      {deleteModal && (
        <Modal title="Delete Lesson" onClose={() => setDeleteModal(null)} onConfirm={handleDelete} confirmLabel="Delete"
          confirmClass="bg-red-500 hover:bg-red-600 text-white">
          <p className="text-sm text-[var(--text)] opacity-70">
            Are you sure you want to delete <span className="font-medium">"{deleteModal.title}"</span>?
          </p>
        </Modal>
      )}
      {quizModal && (
        <Modal title="Create Quiz" onClose={() => setQuizModal(null)} onConfirm={handleCreateQuiz} confirmLabel="Create Quiz">
          <QuizForm form={quizForm} onChange={setQuizForm} onGenerateAi={handleGenerateWithAi} generatingAi={generatingAi} />
        </Modal>
      )}
      {explainModal && (
        <Modal title={`AI Explanation — ${explainModal.title}`} onClose={() => setExplainModal(null)} onConfirm={() => setExplainModal(null)} confirmLabel="Close">
          {explaining ? <p className="text-sm opacity-50">Generating...</p> : (
            <p className="text-sm whitespace-pre-wrap leading-relaxed opacity-80">{explanation}</p>
          )}
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, onClose, onConfirm, confirmLabel, confirmClass, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <h2 className="text-sm font-medium">{title}</h2>
        <button onClick={onClose} className="text-[var(--text)] opacity-40 hover:opacity-100 text-lg leading-none">✕</button>
      </div>
      <div className="px-5 py-4">{children}</div>
      <div className="flex justify-end gap-2 px-5 py-4 border-t border-[var(--border)]">
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-[var(--border)] hover:bg-[var(--bg)]">Cancel</button>
        <button onClick={onConfirm} className={`px-4 py-2 text-sm rounded-lg font-medium ${confirmClass || "bg-cyan-500 hover:bg-cyan-600 text-white"}`}>{confirmLabel}</button>
      </div>
    </div>
  </div>
);

const LessonForm = ({ form, chapters = [], onChange }) => {
  const [uploading, setUploading] = useState({ video: false, file: false });

  const handleUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const key = type === "video" ? "video" : "file";
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const { data } = await uploadFile(file, type === "video" ? "video" : "document");
      onChange(type === "video" ? "video_url" : "file_url", data.url);
    } catch {
      /* ignore */
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };

  return (
  <div className="flex flex-col gap-3">
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Title</label>
      <input type="text" value={form.title} onChange={(e) => onChange("title", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500" />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Duration (minutes)</label>
      <input type="number" value={form.duration} onChange={(e) => onChange("duration", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500" />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Content</label>
      <textarea rows={3} value={form.content} onChange={(e) => onChange("content", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 resize-none" />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Chapter</label>
      <select value={form.chapter_id || ""} onChange={(e) => onChange("chapter_id", e.target.value || null)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500">
        <option value="">No chapter</option>
        {chapters.map((ch) => <option key={ch.id} value={ch.id}>{ch.order}. {ch.title}</option>)}
      </select>
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Status</label>
      <select value={form.status} onChange={(e) => onChange("status", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500">
        <option>Draft</option>
        <option>Published</option>
      </select>
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Video (MP4, WebM)</label>
      <input type="file" accept="video/*" onChange={(e) => handleUpload(e, "video")}
        className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-cyan-500 file:text-white" />
      {uploading.video && <span className="text-xs opacity-40">Uploading...</span>}
      {form.video_url && <span className="text-xs text-green-500 truncate">Video attached ✓</span>}
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Resource (PDF, DOC)</label>
      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleUpload(e, "file")}
        className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-cyan-500 file:text-white" />
      {uploading.file && <span className="text-xs opacity-40">Uploading...</span>}
      {form.file_url && <span className="text-xs text-green-500 truncate">File attached ✓</span>}
    </div>
  </div>
  );
};

const QuizForm = ({ form, onChange, onGenerateAi, generatingAi }) => (
  <div className="flex flex-col gap-3">
    {onGenerateAi && (
      <button type="button" onClick={onGenerateAi} disabled={generatingAi}
        className="flex items-center justify-center gap-2 px-3 py-2 text-xs rounded-lg border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 disabled:opacity-50">
        {generatingAi ? "Generating..." : "✨ Generate questions with AI"}
      </button>
    )}
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Quiz Title</label>
      <input type="text" value={form.title} onChange={(e) => onChange({ ...form, title: e.target.value })}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-[var(--text)] opacity-50">Timer (min)</label>
        <input type="number" value={form.timer_minutes} onChange={(e) => onChange({ ...form, timer_minutes: parseInt(e.target.value) || 10 })}
          className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-[var(--text)] opacity-50">Pass Score (%)</label>
        <input type="number" value={form.pass_score} onChange={(e) => onChange({ ...form, pass_score: parseInt(e.target.value) || 70 })}
          className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500" />
      </div>
    </div>
    {form.questions.map((q, qi) => (
      <div key={qi} className="p-3 rounded-lg border border-[var(--border)] flex flex-col gap-2">
        <input type="text" placeholder="Question" value={q.content}
          onChange={(e) => {
            const questions = [...form.questions];
            questions[qi] = { ...q, content: e.target.value };
            onChange({ ...form, questions });
          }}
          className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500" />
        {q.options.map((opt, oi) => (
          <input key={oi} type="text" placeholder={`Option ${oi + 1}`} value={opt}
            onChange={(e) => {
              const questions = [...form.questions];
              const options = [...q.options];
              options[oi] = e.target.value;
              questions[qi] = { ...q, options };
              onChange({ ...form, questions });
            }}
            className="px-3 py-1.5 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500" />
        ))}
        <select value={q.correct_answer} onChange={(e) => {
          const questions = [...form.questions];
          questions[qi] = { ...q, correct_answer: e.target.value };
          onChange({ ...form, questions });
        }}
          className="px-3 py-1.5 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500">
          <option value="">Correct answer</option>
          {q.options.filter(Boolean).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    ))}
    <button type="button" onClick={() => onChange({ ...form, questions: [...form.questions, { content: "", options: ["", ""], correct_answer: "" }] })}
      className="text-xs text-cyan-500 hover:underline text-left">+ Add question</button>
  </div>
);

export default Lessons;
