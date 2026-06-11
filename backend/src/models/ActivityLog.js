import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    action: {
      type: String,
      enum: ["LOGIN", "TASK_CREATE", "TASK_UPDATE", "TASK_DELETE"],
      required: true
    },
    entity: { type: String, default: "" },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    message: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    ipAddress: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLog", activityLogSchema);

