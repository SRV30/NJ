import express from "express";
import admin from "../middleware/Admin.js";
import auth from "../middleware/auth.js";
import {
  createTerms,
  deleteTerms,
  getTerms,
  updateTerms,
} from "../controllers/termsController.js";

const termsRouter = express.Router();

termsRouter.get("/", getTerms);
termsRouter.post("/", auth, admin, createTerms);
termsRouter.put("/:id", auth, admin, updateTerms);
termsRouter.delete("/:id", auth, admin, deleteTerms);

export default termsRouter;
