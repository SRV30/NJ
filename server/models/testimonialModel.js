import mongoose from "mongoose";
const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Testimonial", testimonialSchema);
