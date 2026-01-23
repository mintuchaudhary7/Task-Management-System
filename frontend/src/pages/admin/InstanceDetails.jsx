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
                setInstance(res.instance);
                setTasks(res.tasks || []);
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
                    task._id === taskId
                        ? { ...task, status: newStatus }
                        : task
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
            header: "Status",
            render: (row) => (
                <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row._id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className={`px-3 py-1.5 rounded-md border text-sm font-medium
                                transition-colors duration-200
                              ${row.status === "completed"
                            ? "status-completed"
                            : row.status === "in-progress"
                                ? "status-in-progress"
                                : "status-pending"
                        }`}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
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
        <>
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
                <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg border mb-6">
                    <p>
                        <strong>Template:</strong>{" "}
                        {instance.templateId?.name || "N/A"}
                    </p>
                    <p>
                        <strong>Assigned User:</strong>{" "}
                        {instance.assignedUserId?.name || "N/A"}
                    </p>
                    <p>
                        <strong>Role:</strong>{" "}
                        {instance.assignedUserId?.role || "N/A"}
                    </p>
                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(instance.createdAt).toLocaleString()}
                    </p>
                </div>

                {/* Tasks */}
                <h2 className="text-xl font-semibold mb-3">Tasks</h2>

                <Table
                    columns={columns}
                    data={tasks}
                    emptyMessage="No tasks found for this instance."
                />
            </div>
        </>
    );
};

export default InstanceDetails;
