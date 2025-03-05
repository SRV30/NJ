import { Router } from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";
import upload from "../middleware/multer.js";
import {
  addJewelleryCategory,
  deleteJewelleryCategory,
  getJewelleryCategory,
  updateJewelleryCategory,
} from "../controllers/jewelleryController.js";

const jewelleryRouter = Router();

jewelleryRouter.post(
  "/add",
  auth,
  admin,
  upload.single("images"),
  addJewelleryCategory
);
jewelleryRouter.get("/get", getJewelleryCategory);
jewelleryRouter.put(
  "/update/:id",
  auth,
  admin,
  upload.single("images"),
  updateJewelleryCategory
);
jewelleryRouter.delete("/delete/:id", auth, admin, deleteJewelleryCategory);

export default jewelleryRouter;
