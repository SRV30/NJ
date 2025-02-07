import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import Product from "../models/productModel.js";
l;

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;

    const uploadResult = await uploadImage(file);

    return res.json({
      message: "Image uploaded successfully",
      data: uploadResult,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Image upload failed",
      error: true,
      success: false,
    });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({
        message: "public_id is required",
        error: true,
        success: false,
      });
    }

    const result = await deleteImage(public_id);

    if (result.result !== "ok") {
      return res.status(500).json({
        message: "Failed to delete image from Cloudinary",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Image deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Image deletion failed",
      error: true,
      success: false,
    });
  }
};

export { uploadImageController, deleteImageController };
