import { useState, useEffect, useCallback } from "react";

import { PlusCircle, Pencil, Trash2, Search, BookOpen } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getCourses, createCourse, updateCourse, deleteCourse, mapCourseFromApi } from "../../services/courses";
import { ACADEMIC_CATEGORIES } from "../../utils/roleLabels";

const CATEGORIES = ACADEMIC_CATEGORIES;
const PER_PAGE = 5;
const emptyForm = { title: "", content: "", category: "Computer Science", status: "Draft" };



const Courses = () => {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [total, setTotal] = useState(0);

  const [addModal, setAddModal] = useState(false);

  const [editModal, setEditModal] = useState(null);

  const [deleteModal, setDeleteModal] = useState(null);

  const [form, setForm] = useState(emptyForm);



  const fetchCourses = useCallback(async () => {

    try {

      setLoading(true);

      const { data } = await getCourses({ page, per_page: PER_PAGE, search, category: categoryFilter });

      setCourses(data.data.map(mapCourseFromApi));

      setTotalPages(data.last_page);

      setTotal(data.total);

      setError("");

    } catch {

      setError("Failed to load courses.");

    } finally {

      setLoading(false);

    }

  }, [page, search, categoryFilter]);



  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
  };



  const handleCategoryChange = (e) => {

    setCategoryFilter(e.target.value);

    setPage(1);

  };



  const handleAdd = async () => {

    if (!form.title) return;

    try {

      await createCourse({ ...form, price: 0 });

      setAddModal(false);

      setForm(emptyForm);

      setPage(1);

      fetchCourses();

    } catch {

      setError("Failed to create course.");

    }

  };



  const openEdit = (course) => {

    setEditModal(course);

    setForm({ title: course.title, content: course.content || "", category: course.category, status: course.status });

  };



  const handleEdit = async () => {

    if (!form.title) return;

    try {

      await updateCourse(editModal.id, { ...form, price: 0 });

      setEditModal(null);

      setForm(emptyForm);

      fetchCourses();

    } catch {

      setError("Failed to update course.");

    }

  };



  const handleDelete = async () => {

    try {

      await deleteCourse(deleteModal.id);

      setDeleteModal(null);

      if (courses.length === 1 && page > 1) setPage((p) => p - 1);

      else fetchCourses();

    } catch {

      setError("Failed to delete course.");

    }

  };



  if (loading && courses.length === 0) {

    return <p className="text-sm text-[var(--text)] opacity-50">Loading courses...</p>;

  }



  return (

    <div className="flex flex-col gap-4">

      <div className="flex items-center justify-between flex-wrap gap-3">

        <div>

          <h1 className="text-lg font-medium">Courses</h1>

          <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">{total} total courses</p>

        </div>

        <button onClick={() => { setForm(emptyForm); setAddModal(true); }}

          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors">

          <PlusCircle size={15} /> Add Course

        </button>

      </div>



      {error && <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}



      <div className="flex flex-wrap gap-3">

        <div className="relative flex-1 min-w-[200px]">

          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-40" />

          <input type="text" placeholder="Search courses..." value={searchInput} onChange={handleSearch}

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

                {["Title", "Teacher", "Department", "Students", "Status", "Created", "Actions"].map((h) => (

                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--text)] opacity-50 whitespace-nowrap">{h}</th>

                ))}

              </tr>

            </thead>

            <tbody>

              {courses.length === 0 ? (

                <tr>

                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-[var(--text)] opacity-40">

                    No courses found

                  </td>

                </tr>

              ) : courses.map((course) => (

                <tr key={course.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors">

                  <td className="px-4 py-3 font-medium whitespace-nowrap">{course.title}</td>

                  <td className="px-4 py-3 text-[var(--text)] opacity-70 whitespace-nowrap">{course.instructor}</td>

                  <td className="px-4 py-3 whitespace-nowrap">

                    <span className="px-2 py-0.5 rounded-full text-xs bg-cyan-500/10 text-cyan-500">{course.category}</span>

                  </td>

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

            {total === 0

              ? "No courses"

              : `Showing ${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, total)} of ${total}`}

            {loading && " · Updating..."}

          </p>

          <div className="flex gap-2">

            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}

              className="px-3 py-1 text-xs rounded-md border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--bg)] transition-colors">Prev</button>

            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}

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

    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--text)] opacity-50">Course Title</label>
      <input type="text" value={form.title} onChange={(e) => onChange("title", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors" />
    </div>

    <div className="flex flex-col gap-1">

      <label className="text-xs text-[var(--text)] opacity-50">Description</label>

      <textarea rows={2} value={form.content || ""} onChange={(e) => onChange("content", e.target.value)}

        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors resize-none" />

    </div>

    <div className="flex flex-col gap-1">

      <label className="text-xs text-[var(--text)] opacity-50">Department / Subject</label>

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

