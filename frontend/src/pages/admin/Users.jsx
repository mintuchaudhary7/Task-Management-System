import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../../components/Table";
import AddUserModal from "../../components/admin/AddUserModal";
import { getAllUsers } from "../../api/user.api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data || []);
      toast.success("Users loaded successfully!"); // ✅ success toast
    } catch (err) {
      console.error("Failed to fetch users", err);
      setUsers([]);
      toast.error("Failed to load users"); // ✅ error toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { header: "#", render: (_, index) => index + 1 },
    {
      header: "Name",
      render: (row) => (
        <span className="font-medium text-text-dark">{row.name || "—"}</span>
      ),
    },
    { header: "Email", key: "email" },
    {
      header: "Role",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.role === "ADMIN"
              ? "bg-accent-purple text-white"
              : "bg-accent-blue text-white"
          }`}
        >
          {row.role === "ADMIN" ? "Admin" : "Doer"}
        </span>
      ),
    },
    {
      header: "Status",
      render: () => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-success-soft text-success">
          Active
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-text-dark">Users Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-text-light px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            + Add User
          </button>
        </div>

        {/* ===== TABLE / LOADING ===== */}
        {loading ? (
          <p className="text-text-muted">Loading users...</p>
        ) : (
          <Table
            columns={columns}
            data={users}
            emptyMessage="No users found."
          />
        )}
      </div>

      {/* ===== ADD USER MODAL ===== */}
      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onUserCreated={fetchUsers}
        />
      )}
    </>
  );
};

export default Users;
