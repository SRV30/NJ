import { Router } from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";
import upload from "../middleware/multer.js";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.post(
  "/add",
  auth,
  admin,
  upload.single("images"),
  addCategory
);
categoryRouter.get("/get", getCategory);
categoryRouter.put(
  "/update/:id",
  auth,
  admin,
  upload.single("images"),
  updateCategory
);
categoryRouter.delete("/delete/:id", auth, admin, deleteCategory);

export default categoryRouter;
