import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyInstances } from "../../api/instances.api";

const DoerDashboard = () => {
    const navigate = useNavigate();

    const [instances, setInstances] = useState([]);
    const [loading, setLoading] = useState(false);

    /* ================= FETCH MY INSTANCES ================= */
    useEffect(() => {
        const fetchInstances = async () => {
            setLoading(true);
            try {
                const res = await getMyInstances();
                console.log(res)

                // backend returns: { success, message, data: [] }
                setInstances(res?.data || []);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch instances");
            } finally {
                setLoading(false);
            }
        };

        fetchInstances();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Instances</h1>
                <p className="text-sm text-gray-500 mt-1 sm:mt-0">
                    Click an instance to view tasks and workflow
                </p>
            </div>

            {loading ? (
                <p className="text-gray-600">Loading instances...</p>
            ) : instances.length === 0 ? (
                <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
                    <p className="text-gray-500 font-medium">
                        No instances assigned yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instances.map((instance) => (
                        <div
                            key={instance._id}
                            onClick={() => navigate(`/member/instances/${instance._id}`)}
                            className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            {/* Gradient Top Strip */}
                            <div className="h-2 w-full bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-purple)] to-[var(--color-accent-green)]" />

                            <div className="p-5">
                                {/* Top Row */}
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-lg font-bold text-[var(--color-text-dark)] group-hover:text-[var(--color-primary)] transition">
                                        {instance.name}
                                    </h2>

                                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-secondary)] text-[var(--color-text-muted)] font-semibold border">
                                        Active
                                    </span>
                                </div>

                                {/* Template */}
                                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                                    <span className="font-semibold text-[var(--color-text-dark)]">
                                        Template:
                                    </span>{" "}
                                    {instance.templateId?.name || "N/A"}
                                </p>

                                {/* Team */}
                                <div className="text-sm text-[var(--color-text-dark)] space-y-2 mb-5">
                                    <p className="flex justify-between">
                                        <span className="font-semibold text-[var(--color-text-muted)]">
                                            Marketer
                                        </span>
                                        <span className="font-medium">{instance.team?.marketer?.name || "N/A"}</span>
                                    </p>

                                    <p className="flex justify-between">
                                        <span className="font-semibold text-[var(--color-text-muted)]">
                                            Reviewer
                                        </span>
                                        <span className="font-medium">{instance.team?.reviewer?.name || "N/A"}</span>
                                    </p>

                                    <p className="flex justify-between">
                                        <span className="font-semibold text-[var(--color-text-muted)]">
                                            Designer
                                        </span>
                                        <span className="font-medium">{instance.team?.designer?.name || "N/A"}</span>
                                    </p>
                                </div>

                                {/* Progress Bar (Dummy Data) */}
                                {(() => {
                                    const progress = Math.floor(Math.random() * 60) + 30; // 30% - 90%

                                    return (
                                        <div className="mb-5">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-xs font-semibold text-[var(--color-text-muted)]">
                                                    Progress
                                                </p>
                                                <p className="text-xs font-bold text-[var(--color-text-dark)]">
                                                    {progress}%
                                                </p>
                                            </div>

                                            <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                                                <div
                                                    style={{ width: `${progress}%` }}
                                                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] transition-all duration-500"
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Footer */}
                                <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)]">
                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        Created: {new Date(instance.createdAt).toLocaleDateString()}
                                    </p>

                                    <span className="text-sm font-bold text-[var(--color-primary)] group-hover:translate-x-1 transition-transform duration-300">
                                        View →
                                    </span>
                                </div>
                            </div>

                            {/* Soft Glow Hover Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                                <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-[var(--color-accent-purple)] blur-3xl opacity-20"></div>
                                <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-[var(--color-accent-blue)] blur-3xl opacity-20"></div>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
};

export default DoerDashboard;


// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// import { useAuth } from "../../context/AuthContext";
// import Table from "../../components/Table";

// import { updateTaskStatus, userTasks } from "../../api/task.api";

// const DoerDashboard = () => {
//     const { user } = useAuth();

//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const userId = user?._id;
//     const role = user?.role;

//     //  Role based allowed statuses
//     const roleStatusOptions = {
//         MARKETER: ["pending", "in-progress", "for-review"],
//         REVIEWER: ["for-review", "changes-requested", "approved"],
//         DESIGNER: ["approved", "completed"],
//     };

//     const allowedStatuses = roleStatusOptions[role] || [];

//     const handleStatusChange = async (taskId, newStatus) => {
//         try {
//             await updateTaskStatus(taskId, newStatus);

//             setTasks((prevTasks) =>
//                 prevTasks.map((task) =>
//                     task._id === taskId ? { ...task, status: newStatus } : task
//                 )
//             );

//             toast.success("Task status updated successfully!");
//         } catch (err) {
//             console.error("Failed to update task status:", err);
//             toast.error("Could not update status. Please try again.");
//         }
//     };

//     useEffect(() => {
//         const fetchTasks = async () => {
//             if (!userId) return;

//             setLoading(true);
//             try {
//                 const res = await userTasks(userId);

//                 // backend response is res.data.data (tasks array)
//                 setTasks(res?.data || []);
//             } catch (err) {
//                 console.error("Error fetching tasks:", err);
//                 toast.error("Failed to fetch tasks!");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTasks();
//     }, [userId]);

//     const columns = [
//         {
//             header: "Sr. No.",
//             render: (row, idx) => idx + 1,
//         },
//         {
//             header: "Instance/Project",
//             render: (row) => row.instanceId?.name || "N/A",
//         },
//         {
//             header: "Task",
//             key: "name",
//         },
//         {
//             header: "Status",
//             render: (row) => {
//                 //  Completed task can be seen by anyone but cannot be edited
//                 const isCompleted = row.status === "completed";

//                 return (
//                     <select
//                         value={row.status}
//                         disabled={isCompleted}
//                         onChange={(e) => handleStatusChange(row._id, e.target.value)}
//                         className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors duration-200
//                              ${row.status === "completed"
//                                 ? "status-completed"
//                                 : row.status === "in-progress"
//                                     ? "status-in-progress"
//                                     : row.status === "for-review"
//                                         ? "status-review"
//                                         : row.status === "changes-requested"
//                                             ? "status-changes"
//                                             : row.status === "approved"
//                                                 ? "status-approved"
//                                                 : "status-pending"
//                             }
//                            ${isCompleted ? "opacity-60 cursor-not-allowed" : ""}
//                           `}

//                     >
//                         {/* Current status always visible */}
//                         <option value={row.status}>
//                             {row.status.toUpperCase()}
//                         </option>

//                         {/* Allowed status options based on role */}
//                         {allowedStatuses
//                             .filter((status) => status !== row.status) // remove duplicate
//                             .map((status) => (
//                                 <option key={status} value={status}>
//                                     {status.toUpperCase()}
//                                 </option>
//                             ))}
//                     </select>
//                 );
//             },
//         },
//     ];

//     return (
//         <div className="p-3">
//             <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

//             {loading ? (
//                 <p>Loading tasks...</p>
//             ) : (
//                 <Table
//                     columns={columns}
//                     data={tasks}
//                     emptyMessage="No tasks assigned yet."
//                 />
//             )}
//         </div>
//     );
// };

// export default DoerDashboard;

