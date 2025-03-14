import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    jewelleryType: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Jewellery",
      },
    ],
    productCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    metal: {
      type: String,
      required: [true, "Please specify the metal type"],
      enum: ["Gold", "Silver", "Diamond", "Other"],
    },
    metalColour: {
      type: String,
      default: "",
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
          name: { type: String, required: true },
          rating: { type: Number, required: true, min: 1, max: 5 },
          comment: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    bestseller: {
      type: String,
      default: "No",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index(
  { name: "text", description: "text" },
  { weights: { name: 10, description: 5 } }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
