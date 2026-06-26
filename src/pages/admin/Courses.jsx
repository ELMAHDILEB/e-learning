import { useState } from "react";
import { PlusCircle, Pencil, Trash2, Search, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";

const INITIAL_COURSES = [
  { id: 1, title: "React for Beginners", instructor: "Ahmed Benali", category: "Web Dev", price: 49.99, status: "Published", students: 120, created: "01/01/2024" },
  { id: 2, title: "Advanced Node.js", instructor: "Sara Idrissi", category: "Backend", price: 69.99, status: "Published", students: 85, created: "15/02/2024" },
  { id: 3, title: "UI/UX Design Fundamentals", instructor: "Omar Tazi", category: "Design", price: 39.99, status: "Draft", students: 0, created: "03/03/2024" },
  { id: 4, title: "Python Data Science", instructor: "Fatima Zahra", category: "Data", price: 89.99, status: "Published", students: 200, created: "20/03/2024" },
  { id: 5, title: "Docker & Kubernetes", instructor: "Karim Fassi", category: "DevOps", price: 79.99, status: "Published", students: 60, created: "10/04/2024" },
  { id: 6, title: "Flutter Mobile Dev", instructor: "Rim Kettani", category: "Mobile", price: 59.99, status: "Draft", students: 0, created: "05/05/2024" },
  { id: 7, title: "Machine Learning A-Z", instructor: "Hassan Ouali", category: "Data", price: 99.99, status: "Published", students: 310, created: "18/05/2024" },
  { id: 8, title: "GraphQL Mastery", instructor: "Leila Bakkali", category: "Backend", price: 49.99, status: "Draft", students: 0, created: "22/06/2024" },
  { id: 9, title: "Tailwind CSS Pro", instructor: "Nadia Chraibi", category: "Web Dev", price: 29.99, status: "Published", students: 145, created: "30/06/2024" },
  { id: 10, title: "TypeScript Deep Dive", instructor: "Bilal Mrani", category: "Web Dev", price: 59.99, status: "Published", students: 98, created: "11/07/2024" },
  { id: 11, title: "AWS Cloud Practitioner", instructor: "Youssef Alami", category: "DevOps", price: 89.99, status: "Draft", students: 0, created: "14/07/2024" },
  { id: 12, title: "Vue.js Complete Guide", instructor: "Houda Bennis", category: "Web Dev", price: 44.99, status: "Published", students: 77, created: "01/08/2024" },
];

const CATEGORIES = ["All", "Web Dev", "Backend", "Design", "Data", "DevOps", "Mobile"];
const PER_PAGE = 5;
const emptyForm = { title: "", instructor: "", category: "Web Dev", price: "", status: "Draft" };

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const { search, setSearch, filtered: searchFiltered } = useSearch(courses, ["title", "instructor"]);
  const categoryFiltered = categoryFilter === "All" ? searchFiltered : searchFiltered.filter((c) => c.category === categoryFilter);
  const { page, totalPages, paginated, prevPage, nextPage, resetPage } = usePagination(categoryFiltered, PER_PAGE);

  const handleSearch = (e) => { setSearch(e.target.value); resetPage(); };
  const handleCategoryChange = (e) => { setCategoryFilter(e.target.value); resetPage(); };

  const handleAdd = () => {
    if (!form.title || !form.instructor) return;
    const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses((prev) => [...prev, { id: newId, ...form, price: parseFloat(form.price) || 0, students: 0, created: new Date().toLocaleDateString("en-GB") }]);
    setAddModal(false);
    setForm(emptyForm);
  };

  const openEdit = (course) => {
    setEditModal(course);
    setForm({ title: course.title, instructor: course.instructor, category: course.category, price: course.price, status: course.status });
  };

  const handleEdit = () => {
    if (!form.title || !form.instructor) return;
    setCourses((prev) => prev.map((c) => (c.id === editModal.id ? { ...c, ...form, price: parseFloat(form.price) || 0 } : c)));
    setEditModal(null);
    setForm(emptyForm);
  };

  const handleDelete = () => {
    setCourses((prev) => prev.filter((c) => c.id !== deleteModal.id));
    setDeleteModal(null);
    if (paginated.length === 1 && page > 1) prevPage();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-medium">Courses</h1>
          <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">{categoryFiltered.length} total courses</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setAddModal(true); }}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors">
          <PlusCircle size={15} /> Add Course
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-40" />
          <input type="text" placeholder="Search courses..." value={search} onChange={handleSearch}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors" />
        </div>
        <select value={categoryFilter} onChange={handleCategoryChange}
          className="px-3 py-2 text-sm rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors">
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Title", "Instructor", "Category", "Price", "Students", "Status", "Created", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--text)] opacity-50 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((course) => (
                <tr key={course.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{course.title}</td>
                  <td className="px-4 py-3 text-[var(--text)] opacity-70 whitespace-nowrap">{course.instructor}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-cyan-500/10 text-cyan-500">{course.category}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">${course.price}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{course.students}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${course.status === "Published" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text)] opacity-50 whitespace-nowrap">{course.created}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigate(`/admin/courses/${course.id}/lessons`)}
                        className="p-1.5 rounded-md hover:bg-cyan-500/10 text-cyan-500 opacity-70 hover:opacity-100 transition-all" title="View Lessons">
                        <BookOpen size={14} />
                      </button>
                      <button onClick={() => openEdit(course)}
                        className="p-1.5 rounded-md hover:bg-[var(--bg)] text-[var(--text)] opacity-60 hover:opacity-100 transition-all">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteModal(course)}
                        className="p-1.5 rounded-md hover:bg-red-500/10 text-[var(--text)] opacity-60 hover:text-red-500 hover:opacity-100 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text)] opacity-50">
            Showing {Math.min((page - 1) * PER_PAGE + 1, categoryFiltered.length)}–{Math.min(page * PER_PAGE, categoryFiltered.length)} of {categoryFiltered.length}
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
        <Modal title="Add New Course" onClose={() => setAddModal(false)} onConfirm={handleAdd} confirmLabel="Add Course">
          <CourseForm form={form} onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))} />
        </Modal>
      )}
      {editModal && (
        <Modal title="Edit Course" onClose={() => setEditModal(null)} onConfirm={handleEdit} confirmLabel="Save Changes">
          <CourseForm form={form} onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))} />
        </Modal>
      )}
      {deleteModal && (
        <Modal title="Delete Course" onClose={() => setDeleteModal(null)} onConfirm={handleDelete} confirmLabel="Delete"
          confirmClass="bg-red-500 hover:bg-red-600 text-white">
          <p className="text-sm text-[var(--text)] opacity-70">
            Are you sure you want to delete <span className="font-medium text-[var(--text)] opacity-100">"{deleteModal.title}"</span>? This action cannot be undone.
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

const CourseForm = ({ form, onChange }) => (
  <div className="flex flex-col gap-3">
    {[["title", "Title", "text"], ["instructor", "Instructor", "text"], ["price", "Price ($)", "number"]].map(([key, label, type]) => (
      <div key={key} className="flex flex-col gap-1">
        <label className="text-xs text-[var(--text)] opacity-50">{label}</label>
        <input type={type} value={form[key]} onChange={(e) => onChange(key, e.target.value)}
          className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors" />
      </div>
    ))}
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Category</label>
      <select value={form.category} onChange={(e) => onChange("category", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors">
        {CATEGORIES.filter(c => c !== "All").map((c) => <option key={c}>{c}</option>)}
      </select>
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

export default Courses;