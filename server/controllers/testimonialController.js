// controllers/testimonialController.js
import Testimonial from "../models/testimonialModel.js";

export const createTestimonial = async (req, res) => {
  try {
    const { name, rating, review, state, country } = req.body;
    const testimonial = new Testimonial({
      name,
      rating,
      review,
      state,
      country,
    });
    await testimonial.save();
    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    testimonial.name = req.body.name || testimonial.name;
    testimonial.rating = req.body.rating || testimonial.rating;
    testimonial.review = req.body.review || testimonial.review;
    testimonial.state = req.body.state || testimonial.state;
    testimonial.country = req.body.country || testimonial.country;
    await testimonial.save();
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    await testimonial.remove();
    res.status(200).json({ success: true, message: "Testimonial removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
