import ActivityLog from "../models/ActivityLog.js";

export async function logActivity({
  user,
  action,
  entity = "",
  entityId,
  message,
  metadata = {},
  req
}) {
  await ActivityLog.create({
    user,
    action,
    entity,
    entityId,
    message,
    metadata,
    ipAddress: req?.ip || ""
  });
}

