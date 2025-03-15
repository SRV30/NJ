import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Photo", PhotoSchema);
