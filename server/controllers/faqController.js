import FAQ from "../models/faqModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const createFAQ = catchAsyncErrors(async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();
    res
      .status(201)
      .json({ success: true, message: "FAQ created", data: newFAQ });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const getAllFAQs = catchAsyncErrors(async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const updateFAQ = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFAQ = await FAQ.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFAQ)
      return res.status(404).json({ success: false, message: "FAQ not found" });
    res
      .status(200)
      .json({ success: true, message: "FAQ updated", data: updatedFAQ });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const deleteFAQ = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFAQ = await FAQ.findByIdAndDelete(id);
    if (!deletedFAQ)
      return res.status(404).json({ success: false, message: "FAQ not found" });
    res.status(200).json({ success: true, message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
