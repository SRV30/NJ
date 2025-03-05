import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import categoryModel from "../models/productCategoryModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const addCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return next(new ErrorHandler("Category already exists", 400));
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

    const newCategory = await categoryModel.create({
      name,
      images: [imageData],
    });

    res.status(201).json({
      success: true,
      message: "Category category added successfully",
      category: newCategory,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const categories = await categoryModel.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const updateCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    let category = await categoryModel.findById(id);

    if (!category) {
      return next(new ErrorHandler("Category category not found", 404));
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
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const deleteCategory = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoryModel.findById(id);
      if (!category) {
        return next(new ErrorHandler("Category not found", 404));
      }

      const associatedProducts = await Product.countDocuments({
        productCategory: { $in: [id] },
      });

      if (associatedProducts > 0) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Category is in use and cannot be deleted.",
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
        message: "Category deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
