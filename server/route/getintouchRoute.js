import express from "express";
import {
  deleteContactForms,
  getContactForms,
  submitContactForm,
} from "../controllers/getintouchController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";

const getintouchRouter = express.Router();

getintouchRouter.post("/submit", submitContactForm);
getintouchRouter.get("/see", auth, admin, getContactForms);
getintouchRouter.delete("/deleteold", deleteContactForms);

export default getintouchRouter;
