import Task from "../models/Task.js";
import { logActivity } from "../services/activityService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function scopedTaskQuery(req, taskId) {
  const query = { _id: taskId };
  if (req.user.role !== "Admin") query.createdBy = req.user._id;
  return query;
}

export const getTasks = asyncHandler(async (req, res) => {
  const filter = req.user.role === "Admin" ? {} : { createdBy: req.user._id };
  const tasks = await Task.find(filter)
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });

  res.json(tasks);
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const task = await Task.create({
    title,
    description,
    status,
    createdBy: req.user._id
  });

  await logActivity({
    user: req.user._id,
    action: "TASK_CREATE",
    entity: "Task",
    entityId: task._id,
    message: `${req.user.name} created task "${task.title}"`,
    req
  });

  res.status(201).json(await task.populate("createdBy", "name email role"));
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne(scopedTaskQuery(req, req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status ?? task.status;
  await task.save();

  await logActivity({
    user: req.user._id,
    action: "TASK_UPDATE",
    entity: "Task",
    entityId: task._id,
    message: `${req.user.name} updated task "${task.title}"`,
    req
  });

  res.json(await task.populate("createdBy", "name email role"));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne(scopedTaskQuery(req, req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.deleteOne();
  await logActivity({
    user: req.user._id,
    action: "TASK_DELETE",
    entity: "Task",
    entityId: task._id,
    message: `${req.user.name} deleted task "${task.title}"`,
    req
  });

  res.json({ message: "Task deleted" });
});

