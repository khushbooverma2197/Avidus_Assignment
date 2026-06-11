import User from "../models/User.js";
import { logActivity } from "../services/activityService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createToken } from "../utils/createToken.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const userCount = await User.countDocuments();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const role = userCount === 0 || email.toLowerCase() === adminEmail ? "Admin" : "User";

  const user = await User.create({ name, email, password, role });
  res.status(201).json({ user, token: createToken(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.status !== "Active") {
    return res.status(403).json({ message: "Account is inactive" });
  }

  await logActivity({
    user: user._id,
    action: "LOGIN",
    message: `${user.name} logged in`,
    req
  });

  res.json({ user, token: createToken(user) });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

