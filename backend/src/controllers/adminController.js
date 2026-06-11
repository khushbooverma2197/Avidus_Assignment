import ActivityLog from "../models/ActivityLog.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ message: "Admins cannot delete their own account" });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await Task.deleteMany({ createdBy: user._id });
  await user.deleteOne();
  res.json({ message: "User and their tasks deleted" });
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["Active", "Inactive"].includes(status)) {
    return res.status(400).json({ message: "Status must be Active or Inactive" });
  }

  if (req.params.id === req.user._id.toString() && status === "Inactive") {
    return res.status(400).json({ message: "Admins cannot deactivate their own account" });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export const getAllTasks = asyncHandler(async (_req, res) => {
  const tasks = await Task.find()
    .populate("createdBy", "name email role status")
    .sort({ createdAt: -1 });

  res.json(tasks);
});

export const getActivityLogs = asyncHandler(async (_req, res) => {
  const logs = await ActivityLog.find()
    .populate("user", "name email role")
    .sort({ createdAt: -1 })
    .limit(100);

  res.json(logs);
});

export const getAnalytics = asyncHandler(async (_req, res) => {
  const [totalUsers, totalTasks, completedTasks, pendingTasks] = await Promise.all([
    User.countDocuments(),
    Task.countDocuments(),
    Task.countDocuments({ status: "Completed" }),
    Task.countDocuments({ status: "Pending" })
  ]);

  res.json({ totalUsers, totalTasks, completedTasks, pendingTasks });
});

