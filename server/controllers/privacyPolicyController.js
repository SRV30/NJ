import PrivacyPolicy from "../models/privacyPolicyModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const getPrivacyPolicies = catchAsyncErrors(async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find();
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching privacy policies", error });
  }
});

export const getPrivacyPolicyById = catchAsyncErrors(async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: "Privacy Policy not found" });
    }
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ message: "Error fetching privacy policy", error });
  }
});

export const createPrivacyPolicy = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPolicy = new PrivacyPolicy({ title, content });
    await newPolicy.save();
    res
      .status(201)
      .json({ message: "Privacy Policy created successfully", newPolicy });
  } catch (error) {
    res.status(500).json({ message: "Error creating privacy policy", error });
  }
};

export const updatePrivacyPolicy = catchAsyncErrors(async (req, res) => {
  try {
    const { title, content } = req.body;
    const policy = await PrivacyPolicy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: "Privacy Policy not found" });
    }

    policy.title = title || policy.title;
    policy.content = content || policy.content;
    policy.lastUpdated = Date.now();

    await policy.save();
    res
      .status(200)
      .json({ message: "Privacy Policy updated successfully", policy });
  } catch (error) {
    res.status(500).json({ message: "Error updating privacy policy", error });
  }
});

export const deletePrivacyPolicy = catchAsyncErrors(async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findByIdAndDelete(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: "Privacy Policy not found" });
    }
    res.status(200).json({ message: "Privacy Policy deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting privacy policy", error });
  }
});
