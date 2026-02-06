import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getInstanceById } from "../../api/instances.api";
import { updateTaskStatus } from "../../api/task.api";
import { useAuth } from "../../context/AuthContext";

import Table from "../../components/Table";

const DoerInstanceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();
    const role = user?.role;

    const [instance, setInstance] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    /* ================= ROLE BASED TASK VISIBILITY ================= */
    const roleTaskVisibility = {
        MARKETER: ["pending", "in-progress", "changes-requested", "completed"],
        REVIEWER: ["for-review", "approved", "completed"],
        DESIGNER: ["approved", "completed"],
    };

    const allowedVisibleStatuses = roleTaskVisibility[role] || [];

    /* ================= FETCH INSTANCE ================= */
    useEffect(() => {
        const fetchInstance = async () => {
            try {
                const res = await getInstanceById(id);

                setInstance(res?.instance);

                // filter tasks based on role visibility
                const filteredTasks = (res?.tasks || []).filter((task) =>
                    allowedVisibleStatuses.includes(task.status)
                );

                setTasks(filteredTasks);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load instance details");
            } finally {
                setLoading(false);
            }
        };

        fetchInstance();
    }, [id, role]);

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

    /* ================= ROLE BASED STATUS OPTIONS ================= */
    const roleStatusOptions = {
        MARKETER: ["pending", "in-progress", "for-review"],
        REVIEWER: ["for-review", "changes-requested", "approved"],
        DESIGNER: ["approved", "completed"],
    };

    const allowedStatuses = roleStatusOptions[role] || [];

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
            render: (row) => {
                const isCompleted = row.status === "completed";

                return (
                    <select
                        value={row.status}
                        disabled={isCompleted}
                        onChange={(e) => handleStatusChange(row._id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors duration-200
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
                            }
              ${isCompleted ? "opacity-60 cursor-not-allowed" : ""}
            `}
                    >
                        {/* current status */}
                        <option value={row.status}>{row.status.toUpperCase()}</option>

                        {/* allowed options */}
                        {allowedStatuses
                            .filter((status) => status !== row.status)
                            .map((status) => (
                                <option key={status} value={status}>
                                    {status.toUpperCase()}
                                </option>
                            ))}
                    </select>
                );
            },
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
                className="mb-4 text-sm text-primary bg-buttonColor p-2 rounded-sm hover:bg-buttonColor/70"
            >
                ← Back to Instances
            </button>

            {/* Title */}
            <h1 className="text-2xl font-bold mb-4">{instance.name}</h1>

            {/* Instance Info */}
            <div className="bg-white p-4 rounded-lg border mb-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Instance Info</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p>
                        <strong>Template:</strong> {instance.templateId?.name || "N/A"}
                    </p>

                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(instance.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Team Info */}
            <div className="bg-white p-4 rounded-lg border mb-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Assigned Team</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p>
                        <strong>Marketer:</strong> {instance.team?.marketer?.name || "N/A"}
                    </p>

                    <p>
                        <strong>Reviewer:</strong> {instance.team?.reviewer?.name || "N/A"}
                    </p>

                    <p>
                        <strong>Designer:</strong> {instance.team?.designer?.name || "N/A"}
                    </p>
                </div>
            </div>

            {/* Tasks */}
            <h2 className="text-xl font-semibold mb-3">
                Tasks ({tasks.length})
            </h2>

            <Table
                columns={columns}
                data={tasks}
                emptyMessage="No tasks available for your role."
                onRowClick={(row) => navigate(`/member/tasks/${row._id}`)}
            />
        </div>
    );
};

export default DoerInstanceDetails;
