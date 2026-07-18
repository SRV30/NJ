import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import errorMiddleware from "./middleware/error.js";
import connectDB from "./config/connectDB.js";
dotenv.config();

process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
  message: "Too many requests, please try again later.",
});

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_WWW_URL,
  "http://localhost:5173",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(limiter);
app.use(morgan("combined"));
app.use(errorMiddleware);
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("Server is running: " + PORT);
});

//routes
import userRouter from "./route/userRoute.js";
import jewelleryRouter from "./route/jewelleryRoute.js";
import categoryRouter from "./route/categoryRoute.js";
import productRouter from "./route/productRoute.js";
import dashboardRoutes from "./route/dashboardRoutes.js";
import addressRouter from "./route/addressRoute.js";
import getintouchRouter from "./route/getintouchRoute.js";
import cartRouter from "./route/cartRoute.js";
import orderRouter from "./route/orderRoute.js";
import wishListRouter from "./route/wishListRoute.js";
import testimonalRouter from "./route/testimonialRoutes.js";
import faqRouter from "./route/faqRoute.js";
import privacyRouter from "./route/privacyPolicyRoutes.js";
import photoRouter from "./route/photoRoute.js";
import termsRouter from "./route/termsRoute.js";

app.use("/api/address", addressRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);
app.use("/api/contact", getintouchRouter);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/faqs", faqRouter);
app.use("/api/jewellery", jewelleryRouter);
app.use("/api/order", orderRouter);
app.use("/api/photo", photoRouter);
app.use("/api/privacy", privacyRouter);
app.use("/api/product", productRouter);
app.use("/api/terms", termsRouter);
app.use("/api/testimonials", testimonalRouter);
app.use("/api/user", userRouter);
app.use("/api/wishlist", wishListRouter);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
