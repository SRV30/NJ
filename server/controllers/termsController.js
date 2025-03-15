import Terms from "../models/termsModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const getTerms = catchAsyncErrors(async (req, res) => {
  try {
    const policies = await Terms.find();
    res.status(200).json(policies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching terms and conditions", error });
  }
});

export const createTerms = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPolicy = new Terms({ title, content });
    await newPolicy.save();
    res
      .status(201)
      .json({ message: "Terms & Conditions created successfully", newPolicy });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating terms and conditions", error });
  }
};

export const updateTerms = catchAsyncErrors(async (req, res) => {
  try {
    const { title, content } = req.body;
    const policy = await Terms.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: "Terms not found" });
    }

    policy.title = title || policy.title;
    policy.content = content || policy.content;
    policy.lastUpdated = Date.now();

    await policy.save();
    res
      .status(200)
      .json({ message: "Terms & Conditions updated successfully", policy });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating terms and conditions", error });
  }
});

export const deleteTerms = catchAsyncErrors(async (req, res) => {
  try {
    const policy = await Terms.findByIdAndDelete(req.params.id);
    if (!policy) {
      return res
        .status(404)
        .json({ message: "Terms and Conditions not found" });
    }
    res
      .status(200)
      .json({ message: "Terms and Conditions deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Terms and Conditions", error });
  }
});
