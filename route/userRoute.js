import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resetPassword,
  updateUserDetails,
  updateUserRole,
  uploadAvatar,
  verifyEmailController,
  verifyOtp,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import { admin } from "../middleware/Admin.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/verify-email", verifyEmailController);

userRouter.post("/login", loginUser);

userRouter.get("/logout", auth, logoutUser);

userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);

userRouter.put("/forgot-password", forgotPassword);

userRouter.put("/verify-otp", verifyOtp);

userRouter.put("/reset-password", resetPassword);

userRouter.put("/refresh-token", refreshToken);

userRouter.get("/me", auth, getUserDetails);

userRouter.put(
  "/update-user",
  auth,
  upload.single("avatar"),
  updateUserDetails
);

userRouter.get("/admin/get", auth, admin, getAllUsers);

userRouter.get("/admin/get/:id", auth, admin, getSingleUser);

userRouter.put("/admin/update", auth, admin, updateUserRole);

userRouter.delete("/admin/delete/:id", auth, admin, deleteUser);

export default userRouter;
