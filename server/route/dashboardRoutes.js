import { Router } from "express";
import {
  deleteNotification,
  getLowStockProducts,
  getNotifications,
  markNotificationAsRead,
} from "../controllers/dashboardController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";

const dashboardRoutes = Router();

dashboardRoutes.get("/notifications", auth, admin, getNotifications);
dashboardRoutes.put("/notifications/read/:id",  markNotificationAsRead);
dashboardRoutes.delete(
  "/notifications/delete/:id",
  auth,
  admin,
  deleteNotification
);
dashboardRoutes.get("/low-stock", auth, admin, getLowStockProducts);

export default dashboardRoutes;
