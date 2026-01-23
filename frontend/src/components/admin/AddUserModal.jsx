import React, { useState } from "react";
import { createUser } from "../../api/user.api";

const AddUserModal = ({ onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DOER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      onUserCreated();
      onClose();
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "DOER",
      });
    } catch (err) {
      console.error("Failed to create user", err);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card-bg w-full max-w-md rounded-2xl shadow-xl p-8 border border-border transition-transform transform hover:scale-[1.01]"
      >
        <h2 className="text-2xl font-semibold text-text-dark mb-6">
          Add New User
        </h2>

        <form onSubmit={handleCreateUser} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-4 py-3 text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue transition"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-4 py-3 text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-4 py-3 text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue transition"
          />

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-3 text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-blue transition"
          >
            <option value="DOER">Doer</option>
            <option value="ADMIN">Admin</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm rounded-lg border border-border text-text-dark hover:bg-secondary transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-sm rounded-lg bg-primary text-text-light hover:bg-primary-hover transition"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
