import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const PrivacyPolicy = mongoose.model("PrivacyPolicy", privacyPolicySchema);
export default PrivacyPolicy;
