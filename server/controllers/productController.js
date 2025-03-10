import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ProductModel from "../models/productModel.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import mongoose from "mongoose";

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      jewelleryType,
      productCategory,
      gender,
      karatage,
      metal,
      diamondClarity,
      metalColour,
      stock,
      discount,
      bestseller,
    } = req.body;

    if (!name || !description || !price || !metal || !gender) {
      return next(
        new ErrorHandler(
          "Please enter all required fields (name, description, price, metal, gender)",
          400
        )
      );
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return next(new ErrorHandler("Please upload at least one image", 400));
    }

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadImage(file);
        return { public_id: result.public_id, url: result.secure_url };
      })
    );

    if (
      !jewelleryType ||
      !jewelleryType.length ||
      !productCategory ||
      !productCategory.length
    ) {
      return next(
        new ErrorHandler(
          "Please specify at least one jewellery type and product category",
          400
        )
      );
    }

    const product = new ProductModel({
      name,
      description,
      price: parseFloat(price),
      jewelleryType: jewelleryType ? JSON.parse(jewelleryType) : [],
      productCategory: productCategory ? JSON.parse(productCategory) : [],
      gender,
      karatage: karatage || "",
      metal,
      diamondClarity: diamondClarity || "",
      metalColour: metalColour || "",
      stock: parseInt(stock, 10) || 0,
      discount: parseFloat(discount) || 0,
      bestseller: bestseller || "No",
      images: uploadedImages,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product Created Successfully",
      data: savedProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    next(new ErrorHandler("Error creating product", 500));
  }
});

export const getProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      keyword,
      priceRange,
      sort,
      jewelleryType,
      productCategory,
      metalColour,
      bestseller,
      newArrival,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};
    if (keyword) {
      const searchRegex = new RegExp(keyword, "i");
      query.$or = [
        { name: { $regex: searchRegex } },
        { gender: { $regex: searchRegex } },
        { metalColour: { $regex: searchRegex } },
      ];

      if (mongoose.Types.ObjectId.isValid(keyword)) {
        query.$or.push(
          { jewelleryType: mongoose.Types.ObjectId(keyword) },
          { productCategory: mongoose.Types.ObjectId(keyword) }
        );
      } else {
        const jewelleryTypeMatch = await mongoose
          .model("Jewellery")
          .find({ name: { $regex: searchRegex } });
        const categoryMatch = await mongoose
          .model("Category")
          .find({ name: { $regex: searchRegex } });

        if (jewelleryTypeMatch.length > 0) {
          query.jewelleryType = { $in: jewelleryTypeMatch.map((j) => j._id) };
        }
        if (categoryMatch.length > 0) {
          query.productCategory = { $in: categoryMatch.map((c) => c._id) };
        }
      }
    }

    if (priceRange && Array.isArray(priceRange) && priceRange.length === 2) {
      query.price = {
        $gte: parseInt(priceRange[0]),
        $lte: parseInt(priceRange[1]),
      };
    }
    if (jewelleryType && !query.jewelleryType)
      query.jewelleryType = jewelleryType;
    if (productCategory && !query.productCategory)
      query.productCategory = productCategory;
    if (metalColour && !query.metalColour) query.metalColour = metalColour;
    if (bestseller) query.bestseller = bestseller;
    if (newArrival === "true")
      query.createdAt = {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      };

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    let sortOption = {};
    switch (sort) {
      case "price-low":
        sortOption = { price: 1 };
        break;
      case "price-high":
        sortOption = { price: -1 };
        break;
      case "rating":
        sortOption = { ratings: -1 };
        break;
      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const totalProducts = await ProductModel.countDocuments(query);
    const products = await ProductModel.find(query)
      .populate("productCategory", "name")
      .populate("jewelleryType", "name")
      .sort(sortOption)
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      totalProducts,
      currentPage: parsedPage,
      totalPages: Math.ceil(totalProducts / parsedLimit),
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in getProducts:", error);
    next(new ErrorHandler("Error fetching products", 500));
  }
});

export const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        error: true,
        success: false,
      });
    }

    const product = await ProductModel.findById(productId)
      .populate("productCategory")
      .populate("jewelleryType");

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler("Error fetching product", 500));
  }
});

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid product ID", 400));
    }

    let product = await ProductModel.findById(id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const {
      name,
      description,
      price,
      jewelleryType,
      productCategory,
      gender,
      karatage,
      metal,
      diamondClarity,
      metalColour,
      stock,
      discount,
      bestseller,
    } = req.body;

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      await Promise.all(
        product.images.map((img) => deleteImage(img.public_id))
      );

      const newImages = await Promise.all(
        req.files.map(async (file) => {
          const result = await uploadImage(file);
          return { public_id: result.public_id, url: result.secure_url };
        })
      );

      product.images = newImages;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? parseFloat(price) : product.price;
    if (jewelleryType) {
      product.jewelleryType = JSON.parse(jewelleryType);
    }
    if (productCategory) {
      product.productCategory = JSON.parse(productCategory);
    }
    product.gender = gender || product.gender;
    product.karatage = karatage || product.karatage;
    product.metal = metal || product.metal;
    product.diamondClarity = diamondClarity || product.diamondClarity;
    product.metalColour = metalColour || product.metalColour;
    product.stock = stock ? parseInt(stock, 10) : product.stock;
    product.discount = discount ? parseFloat(discount) : product.discount;
    product.bestseller = bestseller || product.bestseller;

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Internal server error", 500));
  }
});

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const { deleteId } = req.params;

    if (!deleteId) {
      return res.status(400).json({
        message: "provide deleteId ",
        error: true,
        success: false,
      });
    }

    const product = await ProductModel.findByIdAndDelete(deleteId, {
      returnDocument: "before",
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
        error: true,
        success: false,
      });
    }

    if (product.images && product.images.length > 0) {
      await Promise.all(
        product.images.map((img) => deleteImage(img.public_id))
      );
    }

    return res.json({
      message: "Product deleted successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler("Error deleting product", 500));
  }
});

export const getSimilarProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const { jewelleryType, productCategory } = req.query;

    let filter = { $or: [] };

    if (jewelleryType || productCategory) {
      filter = {
        $or: [],
      };
      if (jewelleryType) {
        filter.$or.push({ jewelleryType: jewelleryType });
      }
      if (productCategory) {
        filter.$or.push({ productCategory: productCategory });
      }
    }

    try {
      const similarProducts = await ProductModel.find(filter).limit(10);

      res.status(200).json({
        success: true,
        count: similarProducts.length,
        similarProducts,
      });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    next(new ErrorHandler("Error fetching similar products", 500));
  }
});

export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.json({ reviews: product.reviews });
  } catch (error) {
    next(new ErrorHandler("Error fetching reviews", 500));
  }
});

export const postProductReview = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;
  const { rating, comment, name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new ErrorHandler("Invalid product ID", 400));
  }

  const product = await ProductModel.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const review = {
    user: req.user._id,
    name,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };

  product.reviews.push(review);
  product.numOfReviews = product.reviews.length;

  product.ratings =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({
    message: "Review posted successfully",
    error: false,
    success: true,
  });
});

export const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, reviewId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !mongoose.Types.ObjectId.isValid(reviewId)
  ) {
    return next(new ErrorHandler("Invalid product or review ID", 400));
  }

  const product = await ProductModel.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviewIndex = product.reviews.findIndex(
    (review) => review._id.toString() === reviewId
  );

  if (reviewIndex === -1) {
    return next(new ErrorHandler("Review not found", 404));
  }

  product.reviews.splice(reviewIndex, 1);
  product.numOfReviews = product.reviews.length;

  if (product.reviews.length > 0) {
    product.ratings =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
  } else {
    product.ratings = 0;
  }

  await product.save();
  res.status(200).json({
    message: "Review deleted successfully",
    error: false,
    success: true,
  });
});
