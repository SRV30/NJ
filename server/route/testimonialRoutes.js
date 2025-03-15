// routes/testimonialRoutes.js
import express from "express";
import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const testimonalRouter = express.Router();
testimonalRouter.route("/").post(createTestimonial).get(getAllTestimonials);
testimonalRouter
  .route("/:id")
  .get(getTestimonialById)
  .put(updateTestimonial)
  .delete(deleteTestimonial);
export default testimonalRouter;
