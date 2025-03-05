import mongoose from "mongoose";

const jewellerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Jewellery Name"],
      unique: true,
      trim: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const JewelleryModel = mongoose.model("Jewellery", jewellerySchema);
export default JewelleryModel;
