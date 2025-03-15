import express from "express";
import {
  getPrivacyPolicies,
  getPrivacyPolicyById,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
} from "../controllers/privacyPolicyController.js";
import admin from "../middleware/Admin.js";
import auth from "../middleware/auth.js";

const privacyRouter = express.Router();

privacyRouter.get("/", getPrivacyPolicies);
privacyRouter.get("/:id", getPrivacyPolicyById);
privacyRouter.post("/", auth, admin, createPrivacyPolicy);
privacyRouter.put("/:id", auth, admin, updatePrivacyPolicy);
privacyRouter.delete("/:id", auth, admin, deletePrivacyPolicy);

export default privacyRouter;
