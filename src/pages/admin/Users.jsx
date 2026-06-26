import { useState } from "react";
import { UserPlus } from "lucide-react";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";
import UserTable from "../../components/Admin/users/UserTable";
import UserModal from "../../components/Admin/users/UserModal";
import UserForm from "../../components/Admin/users/UserForm";
import DeleteConfirm from "../../components/Admin/users/DeleteConfirm";
import UserSearchBar from "../../components/Admin/users/UserSearchBar";

const INITIAL_USERS = [
  { id: 1, name: "Ahmed Benali", email: "ahmed@example.com", role: "Admin", status: "Active", joined: "01/01/2024" },
  { id: 2, name: "Sara Idrissi", email: "sara@example.com", role: "Instructor", status: "Active", joined: "15/02/2024" },
  { id: 3, name: "Youssef Alami", email: "youssef@example.com", role: "Student", status: "Inactive", joined: "03/03/2024" },
  { id: 4, name: "Fatima Zahra", email: "fatima@example.com", role: "Student", status: "Active", joined: "20/03/2024" },
  { id: 5, name: "Omar Tazi", email: "omar@example.com", role: "Instructor", status: "Active", joined: "10/04/2024" },
  { id: 6, name: "Nadia Chraibi", email: "nadia@example.com", role: "Student", status: "Active", joined: "05/05/2024" },
  { id: 7, name: "Karim Fassi", email: "karim@example.com", role: "Student", status: "Inactive", joined: "18/05/2024" },
  { id: 8, name: "Leila Bakkali", email: "leila@example.com", role: "Admin", status: "Active", joined: "22/06/2024" },
  { id: 9, name: "Hassan Ouali", email: "hassan@example.com", role: "Student", status: "Active", joined: "30/06/2024" },
  { id: 10, name: "Rim Kettani", email: "rim@example.com", role: "Instructor", status: "Active", joined: "11/07/2024" },
  { id: 11, name: "Bilal Mrani", email: "bilal@example.com", role: "Student", status: "Inactive", joined: "14/07/2024" },
  { id: 12, name: "Houda Bennis", email: "houda@example.com", role: "Student", status: "Active", joined: "01/08/2024" },
];

const PER_PAGE = 5;
const emptyForm = { name: "", email: "", role: "Student", status: "Active" };

const Users = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [roleFilter, setRoleFilter] = useState("All");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const { search, setSearch, filtered: searchFiltered } = useSearch(users, ["name", "email"]);

  const roleFiltered = roleFilter === "All"
    ? searchFiltered
    : searchFiltered.filter((u) => u.role === roleFilter);

  const { page, totalPages, paginated, prevPage, nextPage, resetPage } = usePagination(roleFiltered, PER_PAGE);

  const handleSearch = (e) => { setSearch(e.target.value); resetPage(); };
  const handleRoleChange = (e) => { setRoleFilter(e.target.value); resetPage(); };
  const handleFormChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setUsers((prev) => [...prev, { id: newId, ...form, joined: new Date().toLocaleDateString("en-GB") }]);
    setAddModal(false);
    setForm(emptyForm);
  };

  const openEdit = (user) => {
    setEditModal(user);
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  };

  const handleEdit = () => {
    if (!form.name || !form.email) return;
    setUsers((prev) => prev.map((u) => (u.id === editModal.id ? { ...u, ...form } : u)));
    setEditModal(null);
    setForm(emptyForm);
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteModal.id));
    setDeleteModal(null);
    if (paginated.length === 1 && page > 1) prevPage();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-medium">Users</h1>
          <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">{roleFiltered.length} total users</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setAddModal(true); }}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"
        >
          <UserPlus size={15} />
          Add User
        </button>
      </div>

      <UserSearchBar
        search={search}
        onSearch={handleSearch}
        roleFilter={roleFilter}
        onRoleChange={handleRoleChange}
      />

      <UserTable
        users={paginated}
        total={roleFiltered.length}
        page={page}
        totalPages={totalPages}
        onEdit={openEdit}
        onDelete={setDeleteModal}
        onPrev={prevPage}
        onNext={nextPage}
      />

      {addModal && (
        <UserModal title="Add New User" onClose={() => setAddModal(false)} onConfirm={handleAdd} confirmLabel="Add User">
          <UserForm form={form} onChange={handleFormChange} />
        </UserModal>
      )}

      {editModal && (
        <UserModal title="Edit User" onClose={() => setEditModal(null)} onConfirm={handleEdit} confirmLabel="Save Changes">
          <UserForm form={form} onChange={handleFormChange} />
        </UserModal>
      )}

      {deleteModal && (
        <UserModal title="Delete User" onClose={() => setDeleteModal(null)} onConfirm={handleDelete} confirmLabel="Delete" confirmClass="bg-red-500 hover:bg-red-600 text-white">
          <DeleteConfirm userName={deleteModal.name} />
        </UserModal>
      )}
    </div>
  );
};

export default Users;