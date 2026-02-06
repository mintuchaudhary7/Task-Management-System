import { useState } from "react";
import { toast } from "react-toastify";
import { createTemplate } from "../../api/templates.api";

const CreateTemplateModal = ({ onClose, onTemplateCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([""]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setDescription("");
    setTasks([""]);
  };

  const addTask = () => setTasks([...tasks, ""]);

  const updateTask = (index, value) => {
    const updated = [...tasks];
    updated[index] = value;
    setTasks(updated);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      tasks: tasks
        .filter((t) => t.trim())
        .map((task, index) => ({ name: task, order: index + 1 })),
    };

    if (payload.tasks.length === 0) {
      toast.error("Please add at least one task");
      return;
    }

    try {
      setLoading(true);
      const res = await createTemplate(payload);

      if (res?.template) {
        toast.success("Template created successfully");
        onTemplateCreated(res.template);
        resetForm();
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card-bg w-full max-w-2xl rounded-3xl shadow-2xl border border-border p-8 animate-fadeIn"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-dark">
              Create Template
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Define reusable tasks for faster execution
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-dark text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Template Name"
            className="w-full rounded-xl border border-border px-4 py-3 focus:ring-2 focus:ring-accent-purple"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description (optional)"
            className="w-full rounded-xl border border-border px-4 py-3 focus:ring-2 focus:ring-accent-purple"
          />

          {/* Tasks */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-text-dark">Tasks</p>
              <button
                type="button"
                onClick={addTask}
                className="text-sm font-medium text-accent-blue hover:underline"
              >
                + Add Task
              </button>
            </div>

            {tasks.map((task, i) => (
              <div key={i} className="flex gap-3">
                <input
                  value={task}
                  onChange={(e) => updateTask(i, e.target.value)}
                  placeholder={`Task ${i + 1}`}
                  className="flex-1 rounded-xl border border-border px-4 py-3"
                />
                {tasks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTask(i)}
                    className="text-danger font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold hover:scale-105 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Template"}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default CreateTemplateModal;
