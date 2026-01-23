import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../api/user.api";
import { getAllTemplates } from "../../api/templates.api";
import { createInstance } from "../../api/instances.api";


const InstanceModal = ({ onClose, onInstanceCreated }) => {
    const [formData, setFormData] = useState({
        name: "",
        templateId: "",
        assignedUserId: "",
    });
    const [users, setUsers] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await getAllUsers();
                const templatesRes = await getAllTemplates();
                console.log(templatesRes, "template")
                console.log(usersRes, "user")

                setUsers(usersRes.data || []);
                setTemplates(templatesRes.data || []);
            } catch (err) {
                console.error("Failed to load data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createInstance(formData);
            onInstanceCreated();
            onClose();
            setFormData({ name: "", templateId: "", assignedUserId: "" });
        } catch (err) {
            console.error("Failed to create instance", err);
            alert("Failed to create instance");
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
            >
                <h2 className="text-lg font-semibold mb-4">Create New Instance</h2>

                {loading ? (
                    <p>Loading users and templates...</p>
                ) : (
                    <form onSubmit={handleCreate} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Instance Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        <select
                            name="templateId"
                            value={formData.templateId}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">Select Template</option>
                            {templates.map((t) => (
                                <option key={t._id} value={t._id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>

                        <select
                            name="assignedUserId"
                            value={formData.assignedUserId}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">Assign User</option>
                            {users.map((u) => (
                                <option key={u._id} value={u._id}>
                                    {u.name} ({u.role === "ADMIN" ? "Admin" : "Doer"})
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm rounded-lg border"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 text-sm rounded-lg bg-primary text-white"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default InstanceModal;
