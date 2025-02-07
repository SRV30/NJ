import express from "express";
import auth from "../middleware/auth.js";
import {
  cancelOrder,
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { admin } from "../middleware/Admin.js";

const orderRouter = express.Router();

orderRouter.post("/create", auth, createOrder);

orderRouter.get("/myorder", auth, myOrders);

orderRouter.get("/get/admin", auth, admin, getAllOrders);

orderRouter.get("/get/:orderId", auth, getSingleOrder);

orderRouter.put("/admin/update/:orderId", auth, admin, updateOrderStatus);

orderRouter.put("/cancel/:orderId", auth, cancelOrder);

orderRouter.delete("/admin/delete/:orderId", auth, admin, deleteOrder);

export default orderRouter;
