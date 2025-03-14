import { Router } from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";
import {
  addPrice,
  getPrice,
  updatePrice,
} from "../controllers/priceController.js";

const priceRouter = Router();

priceRouter.post("/add", auth, admin, addPrice);
priceRouter.get("/get/:metal", auth, admin, getPrice);
priceRouter.put("/update/:metal", auth, admin, updatePrice);

export default priceRouter;
