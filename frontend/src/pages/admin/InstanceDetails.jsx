import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getInstanceById } from "../../api/instances.api";
import { updateTaskStatus } from "../../api/task.api";

import Table from "../../components/Table";

const InstanceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [instance, setInstance] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH INSTANCE ================= */
  useEffect(() => {
    const fetchInstance = async () => {
      try {
        const res = await getInstanceById(id);

        // axios response => res.data
        setInstance(res?.instance);
        setTasks(res?.tasks || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load instance details");
      } finally {
        setLoading(false);
      }
    };

    fetchInstance();
  }, [id]);

  /* ================= UPDATE TASK STATUS ================= */
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );

      toast.success("Task status updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task status");
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: "#",
      render: (_, idx) => idx + 1,
    },
    {
      header: "Task",
      key: "name",
    },
    {
      header: "Assigned To",
      render: (row) => row.assignedUserId?.name || "N/A",
    },
    {
      header: "Status",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={`px-3 py-1.5 rounded-md border text-sm font-semibold cursor-pointer
            transition-all duration-200 shadow-sm
            ${row.status === "completed"
              ? "status-completed"
              : row.status === "in-progress"
                ? "status-in-progress"
                : row.status === "for-review"
                  ? "status-review"
                  : row.status === "changes-requested"
                    ? "status-changes"
                    : row.status === "approved"
                      ? "status-approved"
                      : "status-pending"
            }`}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="for-review">For Review</option>
          <option value="changes-requested">Changes Requested</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
        </select>
      ),
    },
  ];

  /* ================= UI STATES ================= */
  if (loading) return <p className="p-6">Loading...</p>;
  if (!instance) return <p className="p-6">Instance not found</p>;

  /* ================= RENDER ================= */
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-semibold text-primary bg-buttonColor px-4 py-2 rounded-md shadow-sm hover:bg-buttonColor/70 transition"
      >
        ← Back to Instances
      </button>

      {/* Header Card */}
      <div className="relative overflow-hidden rounded-2xl border bg-white shadow-md mb-6">
        {/* Gradient Strip */}
        <div className="h-2 w-full bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-purple)] to-[var(--color-accent-green)]" />

        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-[var(--color-text-dark)] mb-2">
            {instance.name}
          </h1>

          <p className="text-sm text-[var(--color-text-muted)]">
            Template:{" "}
            <span className="font-semibold text-[var(--color-text-dark)]">
              {instance.templateId?.name || "N/A"}
            </span>
          </p>

          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Created At:{" "}
            <span className="font-semibold text-[var(--color-text-dark)]">
              {new Date(instance.createdAt).toLocaleString()}
            </span>
          </p>
        </div>

        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[var(--color-accent-purple)] blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[var(--color-accent-blue)] blur-3xl opacity-20"></div>
      </div>

      {/* Team Info */}
      {/* Team Info (Compact) */}
      <div className="bg-white p-4 rounded-xl border shadow-sm mb-6">
        <h2 className="text-md font-bold mb-3 text-[var(--color-text-dark)]">
          Assigned Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <p>
            <span className="font-semibold">Admin:</span>{" "}
            {instance.createdBy?.name || "N/A"}
          </p>

          <p>
            <span className="font-semibold">Marketer:</span>{" "}
            {instance.team?.marketer?.name || "N/A"}
          </p>

          <p>
            <span className="font-semibold">Reviewer:</span>{" "}
            {instance.team?.reviewer?.name || "N/A"}
          </p>

          <p>
            <span className="font-semibold">Designer:</span>{" "}
            {instance.team?.designer?.name || "N/A"}
          </p>
        </div>
      </div>


      {/* Tasks */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-text-dark)]">
          Tasks ({tasks.length})
        </h2>

        <Table
          columns={columns}
          data={tasks}
          emptyMessage="No tasks found for this instance."
          onRowClick={(row) => navigate(`/admin/tasks/${row._id}`)}
        />
      </div>
    </div>
  );
};

export default InstanceDetails;
