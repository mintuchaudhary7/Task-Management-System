import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getTaskDetails } from "../../api/task.api";
import { addComment } from "../../api/comment.api";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTaskDetails(taskId);
        console.log(res, "akdsj")
        setTask(res?.data || null);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch task details");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setCommentLoading(true);

      const res = await addComment(taskId, commentText);

      // push new comment into task state
      setTask((prev) => ({
        ...prev,
        comments: [res.data, ...(prev.comments || [])],
      }));

      setCommentText("");
      toast.success("Comment added");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading task details...</p>;
  if (!task) return <p className="p-6">Task not found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 text-sm text-primary bg-buttonColor px-4 py-2 rounded-md hover:bg-buttonColor/70"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">{task.name}</h1>

      {/* Info */}
      <div className="bg-white border rounded-xl p-5 shadow-sm mb-6">
        <p className="mb-2">
          <strong>Status:</strong>{" "}
          <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
            {task.status}
          </span>
        </p>

        <p className="mb-2">
          <strong>Instance:</strong> {task.instanceId?.name || "N/A"}
        </p>

        <p className="mb-2">
          <strong>Assigned To:</strong> {task.assignedUserId?.name || "N/A"} (
          {task.assignedUserId?.role || "N/A"})
        </p>

        <p className="mb-2">
          <strong>Created At:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Add Comment */}
      <div className="bg-white border rounded-xl p-5 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Comment</h2>

        <textarea
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={handleAddComment}
          disabled={commentLoading}
          className="mt-3 px-5 py-2 bg-buttonColor text-primary rounded-md hover:bg-buttonColor/70 disabled:opacity-60"
        >
          {commentLoading ? "Adding..." : "Add Comment"}
        </button>
      </div>

      {/* Comments */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Comments ({task.comments?.length || 0})
        </h2>

        {task.comments?.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          <div className="space-y-4">
            {task.comments.map((comment) => (
              <div
                key={comment._id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {comment.userId?.name || "Unknown"}{" "}
                  <span className="text-xs text-gray-500">
                    ({comment.userId?.role || "N/A"})
                  </span>
                </p>

                <p className="text-sm mt-2 text-gray-700">
                  {comment.message}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
