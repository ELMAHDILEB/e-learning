import { useState, useEffect, useCallback } from "react";

import { UserPlus } from "lucide-react";

import UserTable from "../../components/Admin/users/UserTable";

import UserModal from "../../components/Admin/users/UserModal";

import UserForm from "../../components/Admin/users/UserForm";

import DeleteConfirm from "../../components/Admin/users/DeleteConfirm";

import UserSearchBar from "../../components/Admin/users/UserSearchBar";

import { getUsers, createUser, updateUser, deleteUser, mapUserFromApi } from "../../services/users";



const PER_PAGE = 5;

const emptyForm = { name: "", email: "", role: "Student", status: "Active", password: "password123" };



const Users = () => {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [total, setTotal] = useState(0);

  const [addModal, setAddModal] = useState(false);

  const [editModal, setEditModal] = useState(null);

  const [deleteModal, setDeleteModal] = useState(null);

  const [form, setForm] = useState(emptyForm);



  const fetchUsers = useCallback(async () => {

    try {

      setLoading(true);

      const { data } = await getUsers({ page, per_page: PER_PAGE, search, role: roleFilter });

      setUsers(data.data.map(mapUserFromApi));

      setTotalPages(data.last_page);

      setTotal(data.total);

      setError("");

    } catch {

      setError("Failed to load users.");

    } finally {

      setLoading(false);

    }

  }, [page, search, roleFilter]);



  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
  };



  const handleRoleChange = (e) => {

    setRoleFilter(e.target.value);

    setPage(1);

  };



  const handleFormChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));



  const handleAdd = async () => {

    if (!form.name || !form.email) return;

    try {

      await createUser(form);

      setAddModal(false);

      setForm(emptyForm);

      setPage(1);

      fetchUsers();

    } catch {

      setError("Failed to create user.");

    }

  };



  const openEdit = (user) => {

    setEditModal(user);

    setForm({ name: user.name, email: user.email, role: user.role, status: user.status });

  };



  const handleEdit = async () => {

    if (!form.name || !form.email) return;

    try {

      await updateUser(editModal.id, { ...form, role_id: editModal.role_id });

      setEditModal(null);

      setForm(emptyForm);

      fetchUsers();

    } catch {

      setError("Failed to update user.");

    }

  };



  const handleDelete = async () => {

    try {

      await deleteUser(deleteModal.id);

      setDeleteModal(null);

      if (users.length === 1 && page > 1) setPage((p) => p - 1);

      else fetchUsers();

    } catch {

      setError("Failed to delete user.");

    }

  };



  if (loading && users.length === 0) {

    return <p className="text-sm text-[var(--text)] opacity-50">Loading users...</p>;

  }



  return (

    <div className="flex flex-col gap-4">

      <div className="flex items-center justify-between flex-wrap gap-3">

        <div>

          <h1 className="text-lg font-medium">Users</h1>

          <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">{total} total users</p>

        </div>

        <button

          onClick={() => { setForm(emptyForm); setAddModal(true); }}

          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"

        >

          <UserPlus size={15} />

          Add User

        </button>

      </div>



      {error && (

        <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>

      )}



      <UserSearchBar search={searchInput} onSearch={handleSearch} roleFilter={roleFilter} onRoleChange={handleRoleChange} />



      <UserTable

        users={users}

        total={total}

        page={page}

        perPage={PER_PAGE}

        totalPages={totalPages}

        onEdit={openEdit}

        onDelete={setDeleteModal}

        onPrev={() => setPage((p) => Math.max(1, p - 1))}

        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}

        loading={loading}

      />



      {addModal && (

        <UserModal title="Add New User" onClose={() => setAddModal(false)} onConfirm={handleAdd} confirmLabel="Add User">

          <UserForm form={form} onChange={handleFormChange} showPassword />

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

