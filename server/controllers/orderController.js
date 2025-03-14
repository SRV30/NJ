import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import sendEmail from "../config/sendEmail.js";
import generateReceiptHTML from "../emailTemplate/generateReceipt.js";
import generateOrderCancellationEmail from "../emailTemplate/orderCancellationTemplate.js";
import { createNotification } from "./dashboardController.js";

export const createOrder = catchAsyncErrors(async (req, res) => {
  try {
    const { userId, addressId, products } = req.body;

    const newOrder = new OrderModel({
      user: userId,
      address: addressId,
      products,
      orderStatus: "BOOKED",
    });

    await newOrder.save();

    const populatedOrder = await OrderModel.findById(newOrder._id)
      .populate("user", "name email")
      .populate("products.product", "name images");

    const receiptHTML = generateReceiptHTML(populatedOrder);
    const user = await UserModel.findById(userId);

    sendEmail({
      sendTo: user.email,
      subject: "Order Confirmation",
      html: receiptHTML,
    });

    sendEmail({
      sendTo: "nandaniwebsite@gmail.com",
      subject: `New Order Booking by ${user.name}`,
      html: receiptHTML,
    });

     await createNotification(`New booking created by ${user.name}`);
    res.status(201).json({ success: true, order: populatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const getSingleOrder = catchAsyncErrors(async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId)
      .populate("user", "name email")
      .populate("address", "address_line city pincode state country mobile")
      .populate("products.product", "name images");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const myOrders = catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await OrderModel.find({ user: userId })
      .populate("address", "address_line city pincode state country mobile")
      .populate("products.product", "name images")
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin
export const getAllOrders = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name email")
      .populate("address", "address_line city pincode state country mobile")
      .populate("products.product", "name images")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin
export const updateOrderStatus = catchAsyncErrors(async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const userId  =
      req.user && req.user._id ? req.user._id.toString() : "Unknown";

      const validStatuses = ["BOOKED", "PURCHASED", "CANCELLED", "EXPIRED"];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (orderStatus !== "CANCELLED" && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "Only admin can change order status" });
    }

    if (orderStatus === "CANCELLED" && req.user.role !== "ADMIN") {
      if (order.user.toString() !== userId) {
        return res.status(403).json({ success: false, message: "Unauthorized to cancel this order" });
      }

      if (order.orderStatus === "PURCHASED") {
        return res.status(400).json({ success: false, message: "Cannot cancel an order that has been purchased" });
      }
    }

    order.orderStatus = orderStatus;

    order.orderHistory.push({
      status: orderStatus,
      changedAt: new Date(),
      changedBy: adminId.toString(),
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const cancelOrder = catchAsyncErrors(async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await OrderModel.findById(orderId)
      .populate("products.product")
      .populate("user");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    if (order.orderStatus !== "BOOKED") {
      return res.status(400).json({ success: false, message: "Only orders with status BOOKED can be cancelled" });
    }

    if (
      order.user._id.toString() !== userId.toString() &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel this order",
      });
    }

    order.orderStatus = "CANCELLED";
    order.orderHistory.push({
      status: "CANCELLED",
      changedAt: new Date(),
      changedBy: userId,
    });

    await order.save();

    const receiptHTML = generateOrderCancellationEmail(order);
    const emailSent = await sendEmail({
      sendTo: order.user.email,
      subject: "Your Order Has Been Cancelled - Nandani Jewellers",
      html: receiptHTML,
    });

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      emailSent,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const deleteOrder = catchAsyncErrors(async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId).populate(
      "products.product"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this order",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export const deleteAllOrders = catchAsyncErrors(async (req, res) => {
  try {
    await OrderModel.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All orders deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting all orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
