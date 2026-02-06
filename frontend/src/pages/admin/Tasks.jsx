import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { getAllTasks } from "../../api/task.api";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setTasks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = [
    { header: "#", render: (_, index) => index + 1 },
    { header: "Task Name", key: "name" },
    {
      header: "Instance",
      render: (row) => row.instanceId?.name || "—",
    },
    {
      header: "Assigned User",
      render: (row) => row.assignedUserId?.name || "—",
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${row.status === "completed"
            ? "bg-green-100 text-green-700"
            : row.status === "in-progress"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Created At",
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Tasks
        </h1>

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <Table
            columns={columns}
            data={tasks}
            emptyMessage="No tasks found."
            onRowClick={(row) => navigate(`/admin/tasks/${row._id}`)}
          />
        )}
      </div>
    </>
  );
};

export default Tasks;
