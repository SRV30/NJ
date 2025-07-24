import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
     mobile: {
      type: String,
      required: [true, "User mobile number is required"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity should be at least 1"],
        },
        images: [
          {
            public_id: {
              type: String,
            },
            url: {
              type: String,
            },
          },
        ],
      },
    ],
    orderStatus: {
      type: String,
      enum: ["BOOKED", "PURCHASED", "CANCELLED", "EXPIRED", "OUT_OF_STOCK"],
      default: "BOOKED",
    },
    orderHistory: [
      {
        status: {
          type: String,
          enum: ["BOOKED", "PURCHASED", "CANCELLED", "EXPIRED", "OUT_OF_STOCK"],
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
        changedBy: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ user: 1 });
orderSchema.index({ orderStatus: 1 });

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
