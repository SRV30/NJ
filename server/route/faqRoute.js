import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";
import { createFAQ, deleteFAQ, getAllFAQs, updateFAQ } from "../controllers/faqController.js";

const faqRouter = express.Router();

faqRouter.post("/", auth, admin, createFAQ);
faqRouter.get("/", getAllFAQs);
faqRouter.put("/:id",auth, admin, updateFAQ);
faqRouter.delete("/:id",auth, admin, deleteFAQ);

export default faqRouter;
