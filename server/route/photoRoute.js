import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import admin from "../middleware/Admin.js";
import { deletePhoto, getAllPhotos, uploadPhoto } from "../controllers/photoController.js";

const photoRouter = express.Router();

photoRouter.post("/upload", auth, admin, upload.single("photo"), uploadPhoto);
photoRouter.delete("/:id", auth, admin, deletePhoto);
photoRouter.get("/all", getAllPhotos);

export default photoRouter;
