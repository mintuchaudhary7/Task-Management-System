import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../api/user.api";
import { getAllTemplates } from "../../api/templates.api";
import { createInstance } from "../../api/instances.api";

const InstanceModal = ({ onClose, onInstanceCreated }) => {
    const [formData, setFormData] = useState({
        name: "",
        templateId: "",
        marketerId: "",
        reviewerId: "",
        designerId: "",
    });

    const [users, setUsers] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter users based on role
    const marketers = users.filter((u) => u.role === "MARKETER");
    const reviewers = users.filter((u) => u.role === "REVIEWER");
    const designers = users.filter((u) => u.role === "DESIGNER");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await getAllUsers();
                const templatesRes = await getAllTemplates();

                setUsers(usersRes.data?.data || usersRes.data || []);
                setTemplates(templatesRes.data?.data || templatesRes.data || []);
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

            setFormData({
                name: "",
                templateId: "",
                marketerId: "",
                reviewerId: "",
                designerId: "",
            });
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
                        {/* Instance Name */}
                        <input
                            type="text"
                            name="name"
                            placeholder="Instance Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        {/* Template */}
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

                        {/* Marketer */}
                        <select
                            name="marketerId"
                            value={formData.marketerId}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">Assign Marketer</option>
                            {marketers.map((u) => (
                                <option key={u._id} value={u._id}>
                                    {u.name} (Marketer)
                                </option>
                            ))}
                        </select>

                        {/* Reviewer */}
                        <select
                            name="reviewerId"
                            value={formData.reviewerId}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">Assign Reviewer</option>
                            {reviewers.map((u) => (
                                <option key={u._id} value={u._id}>
                                    {u.name} (Reviewer)
                                </option>
                            ))}
                        </select>

                        {/* Designer */}
                        <select
                            name="designerId"
                            value={formData.designerId}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">Assign Designer</option>
                            {designers.map((u) => (
                                <option key={u._id} value={u._id}>
                                    {u.name} (Designer)
                                </option>
                            ))}
                        </select>

                        {/* Buttons */}
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
