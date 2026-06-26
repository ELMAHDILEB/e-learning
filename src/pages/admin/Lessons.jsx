import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlusCircle, Pencil, Trash2, ArrowLeft, Search, Clock, GripVertical } from "lucide-react";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";

const COURSES_DATA = {
  1: { title: "React for Beginners", instructor: "Ahmed Benali" },
  2: { title: "Advanced Node.js", instructor: "Sara Idrissi" },
  3: { title: "UI/UX Design Fundamentals", instructor: "Omar Tazi" },
  4: { title: "Python Data Science", instructor: "Fatima Zahra" },
  5: { title: "Docker & Kubernetes", instructor: "Karim Fassi" },
};

const INITIAL_LESSONS = {
  1: [
    { id: 1, title: "Introduction to React", order: 1, duration: 15, content: "Overview of React and its core concepts.", status: "Published" },
    { id: 2, title: "JSX & Components", order: 2, duration: 20, content: "Understanding JSX syntax and creating components.", status: "Published" },
    { id: 3, title: "Props & State", order: 3, duration: 25, content: "Managing data flow with props and state.", status: "Published" },
    { id: 4, title: "React Hooks", order: 4, duration: 30, content: "Using useState, useEffect and custom hooks.", status: "Draft" },
    { id: 5, title: "React Router", order: 5, duration: 20, content: "Client-side routing with React Router.", status: "Draft" },
    { id: 6, title: "Context API", order: 6, duration: 25, content: "Global state management with Context.", status: "Draft" },
  ],
  2: [
    { id: 1, title: "Node.js Fundamentals", order: 1, duration: 20, content: "Core Node.js concepts and architecture.", status: "Published" },
    { id: 2, title: "Express Framework", order: 2, duration: 25, content: "Building REST APIs with Express.", status: "Published" },
    { id: 3, title: "Authentication & JWT", order: 3, duration: 30, content: "Securing APIs with JWT tokens.", status: "Draft" },
  ],
};

const PER_PAGE = 5;
const emptyForm = { title: "", duration: "", content: "", status: "Draft" };

const Lessons = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = parseInt(id);
  const course = COURSES_DATA[courseId] || { title: `Course #${courseId}`, instructor: "" };

  const [lessons, setLessons] = useState(INITIAL_LESSONS[courseId] || []);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const { search, setSearch, filtered: searchFiltered } = useSearch(lessons, ["title", "content"]);
  const { page, totalPages, paginated, prevPage, nextPage, resetPage } = usePagination(searchFiltered, PER_PAGE);

  const handleSearch = (e) => { setSearch(e.target.value); resetPage(); };

  const handleAdd = () => {
    if (!form.title) return;
    const newId = lessons.length > 0 ? Math.max(...lessons.map((l) => l.id)) + 1 : 1;
    const newOrder = lessons.length + 1;
    setLessons((prev) => [...prev, { id: newId, order: newOrder, ...form, duration: parseInt(form.duration) || 0 }]);
    setAddModal(false);
    setForm(emptyForm);
  };

  const openEdit = (lesson) => {
    setEditModal(lesson);
    setForm({ title: lesson.title, duration: lesson.duration, content: lesson.content, status: lesson.status });
  };

  const handleEdit = () => {
    if (!form.title) return;
    setLessons((prev) => prev.map((l) => (l.id === editModal.id ? { ...l, ...form, duration: parseInt(form.duration) || 0 } : l)));
    setEditModal(null);
    setForm(emptyForm);
  };

  const handleDelete = () => {
    setLessons((prev) => prev.filter((l) => l.id !== deleteModal.id));
    setDeleteModal(null);
    if (paginated.length === 1 && page > 1) prevPage();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={() => navigate("/admin/courses")}
          className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] transition-colors text-[var(--text)] opacity-60 hover:opacity-100">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-medium">{course.title}</h1>
          <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">
            {course.instructor} · {searchFiltered.length} lessons
          </p>
        </div>
        <button onClick={() => { setForm(emptyForm); setAddModal(true); }}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors">
          <PlusCircle size={15} /> Add Lesson
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-40" />
        <input type="text" placeholder="Search lessons..." value={search} onChange={handleSearch}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors" />
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["#", "Title", "Content", "Duration", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--text)] opacity-50 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-[var(--text)] opacity-40">No lessons found</td>
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
          <LessonForm form={form} onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))} />
        </Modal>
      )}
      {editModal && (
        <Modal title="Edit Lesson" onClose={() => setEditModal(null)} onConfirm={handleEdit} confirmLabel="Save Changes">
          <LessonForm form={form} onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))} />
        </Modal>
      )}
      {deleteModal && (
        <Modal title="Delete Lesson" onClose={() => setDeleteModal(null)} onConfirm={handleDelete} confirmLabel="Delete"
          confirmClass="bg-red-500 hover:bg-red-600 text-white">
          <p className="text-sm text-[var(--text)] opacity-70">
            Are you sure you want to delete <span className="font-medium text-[var(--text)] opacity-100">"{deleteModal.title}"</span>?
          </p>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, onClose, onConfirm, confirmLabel, confirmClass, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] w-full max-w-md shadow-xl">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <h2 className="text-sm font-medium">{title}</h2>
        <button onClick={onClose} className="text-[var(--text)] opacity-40 hover:opacity-100 transition-opacity text-lg leading-none">✕</button>
      </div>
      <div className="px-5 py-4">{children}</div>
      <div className="flex justify-end gap-2 px-5 py-4 border-t border-[var(--border)]">
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] transition-colors">Cancel</button>
        <button onClick={onConfirm} className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${confirmClass || "bg-cyan-500 hover:bg-cyan-600 text-white"}`}>{confirmLabel}</button>
      </div>
    </div>
  </div>
);

const LessonForm = ({ form, onChange }) => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Title</label>
      <input type="text" value={form.title} onChange={(e) => onChange("title", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors" />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Duration (minutes)</label>
      <input type="number" value={form.duration} onChange={(e) => onChange("duration", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors" />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Content</label>
      <textarea rows={3} value={form.content} onChange={(e) => onChange("content", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors resize-none" />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Status</label>
      <select value={form.status} onChange={(e) => onChange("status", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors">
        <option>Draft</option>
        <option>Published</option>
      </select>
    </div>
  </div>
);

export default Lessons;