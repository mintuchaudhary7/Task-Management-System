const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.routes");
const templateRoutes = require("./routes/template.routes");
const instanceRoutes = require("./routes/instance.routes");
const taskRoutes = require("./routes/task.routes");
const adminRoutes = require("./routes/admin.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/instances", instanceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager MVP API");
});

module.exports = app;
