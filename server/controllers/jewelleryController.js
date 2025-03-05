import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import JewelleryModel from "../models/jewelleryTypeModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const addJewelleryCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingCategory = await JewelleryModel.findOne({ name });
    if (existingCategory) {
      return next(new ErrorHandler("Type already exists", 400));
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided",
        success: false,
        error: true,
      });
    }

    const upload = await uploadImage(req.file);
    if (!upload || !upload.url) {
      return res.status(500).json({
        message: "Image upload failed",
        success: false,
        error: true,
      });
    }

    const imageData = {
      public_id: upload.public_id,
      url: upload.url,
    };

    const newCategory = await JewelleryModel.create({
      name,
      images: [imageData],
    });

    res.status(201).json({
      success: true,
      message: "Jewellery category added successfully",
      category: newCategory,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getJewelleryCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const categories = await JewelleryModel.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const updateJewelleryCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    let category = await JewelleryModel.findById(id);

    if (!category) {
      return next(new ErrorHandler("Jewellery category not found", 404));
    }

    if (req.body.name) {
      category.name = req.body.name;
    }

    if (req.file) {
      if (category.images.length > 0) {
        for (const img of category.images) {
          await deleteImage(img.public_id);
        }
      }

      const uploaded = await uploadImage(req.file.buffer);
      if (!uploaded || !uploaded.url) {
        return res.status(500).json({
          message: "Image upload failed",
          success: false,
          error: true,
        });
      }

      category.images = [{
        public_id: uploaded.public_id,
        url: uploaded.url,
      }];
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Jewellery category updated successfully",
      category,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const deleteJewelleryCategory = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await JewelleryModel.findById(id);
      if (!category) {
        return next(new ErrorHandler("Jewellery category not found", 404));
      }

      const associatedProducts = await Product.countDocuments({
        jewelleryType: { $in: [id] },
      });

      if (associatedProducts > 0) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Jewellery category is in use and cannot be deleted.",
        });
      }

      if (category.images.length > 0) {
        for (const img of category.images) {
          await deleteImage(img.public_id);
        }
      }

      await category.deleteOne();

      res.status(200).json({
        success: true,
        message: "Jewellery category deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
