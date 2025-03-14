import Notification from "../models/notificationModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const createNotification = catchAsyncErrors(async (message) => {
  try {
    await Notification.create({ message });
    console.log("✅ Notification created:", Notification);
  } catch (error) {
    console.error("❌ Error creating notification:", error);
  }
});

export const getNotifications = catchAsyncErrors(async (req, res, next) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, notifications });
});

export const markNotificationAsRead = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    const notification = await Notification.findById(id);
    if (!notification)
      return next(new ErrorHandler("Notification not found", 404));

    notification.read = true;
    await notification.save();

    res
      .status(200)
      .json({ success: true, message: "Notification marked as read" });
  }
);

export const deleteNotification = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const notification = await Notification.findById(id);
  if (!notification)
    return next(new ErrorHandler("Notification not found", 404));

  await notification.deleteOne();
  res.status(200).json({ success: true, message: "Notification deleted" });
});
