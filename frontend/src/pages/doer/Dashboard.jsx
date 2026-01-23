import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import Table from "../../components/Table";

import { updateTaskStatus, userTasks } from "../../api/task.api";

const DoerDashboard = () => {
    const { user } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const userId = user?._id;
    console.log(userId, "in doer dashboard")

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            // 1. Make the API call
            await updateTaskStatus(taskId, newStatus);

            // 2. Update local state immediately using the 'newStatus' variable
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, status: newStatus } : task
                )
            );
            toast.success("Task status updated successfully!");
        } catch (err) {
            console.error("Failed to update task status:", err);
            toast.error("Could not update status. Please try again.");
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            if (!userId) return;
            setLoading(true);
            try {
                const res = await userTasks(userId);
                console.log("Fetched tasks:", res);
                setTasks(res.tasks || []);
                toast.success("Tasks fetched successfully!");
            } catch (err) {
                console.error("Error fetching tasks:", err);
                toast.error("Failed to fetch tasks!");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId]);


    const columns = [
        {
            header: "Sr. No.",
            render: (row, idx) => idx + 1,
        },
        {
            header: "Instance/Project",
            render: (row) => row.instanceId?.name || "N/A",
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


    return (
        <>
            <div className="p-3">
                <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

                {loading ? (
                    <p>Loading tasks...</p>
                ) : (
                    <Table
                        columns={columns}
                        data={tasks}
                        emptyMessage="No tasks assigned yet."
                    />
                )}
            </div>
        </>
    );
};

export default DoerDashboard;
