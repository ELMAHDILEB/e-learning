const DeleteConfirm = ({ userName }) => (
  <p className="text-sm text-[var(--text)] opacity-70">
    Are you sure you want to delete{" "}
    <span className="font-medium text-[var(--text)] opacity-100">{userName}</span>?
    This action cannot be undone.
  </p>
);

export default DeleteConfirm;