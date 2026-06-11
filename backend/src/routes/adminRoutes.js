import express from "express";
import {
  deleteUser,
  getActivityLogs,
  getAllTasks,
  getAnalytics,
  getUsers,
  updateUserStatus
} from "../controllers/adminController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);
router.get("/analytics", getAnalytics);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/status", updateUserStatus);
router.get("/tasks", getAllTasks);
router.get("/activity-logs", getActivityLogs);

export default router;

