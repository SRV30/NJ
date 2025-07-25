import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ProductModel from "../models/productModel.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import mongoose from "mongoose";
import { createNotification } from "../controllers/dashboardController.js";
import User from "../models/userModel.js";
import CartProductModel from "../models/cartModel.js";
import wishListProductModel from "../models/wishlistModel.js";

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      product_id,
      name,
      description,
      jewelleryType,
      productCategory,
      metal,
      metalColour,
      bestseller,
      gram,
    } = req.body;

    if (!product_id) {
      return next(new ErrorHandler("Please enter id", 400));
    }

    if (!name || !description || !metal || !gram) {
      return next(
        new ErrorHandler(
          "Please enter all required fields (id, name, description, metal, gram)",
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
      product_id,
      name,
      description,
      jewelleryType: jewelleryType ? JSON.parse(jewelleryType) : [],
      productCategory: productCategory ? JSON.parse(productCategory) : [],
      metal: metal || "",
      metalColour: metalColour || "",
      gram: parseFloat(gram),
      bestseller: bestseller || "No",
      images: uploadedImages,
    });

    const savedProduct = await product.save();

    await createNotification(`New product created : ${savedProduct.name}`);

    res.status(201).json({
      message: "Product Created Successfully",
      data: savedProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler("Error creating product", 500));
  }
});

export const getProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      keyword,
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

    const totalProducts = await ProductModel.countDocuments(query);
    const products = await ProductModel.find(query)
      .populate("productCategory", "name")
      .populate("jewelleryType", "name")
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

export const getProductsByJewelleryType = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { jewelleryType } = req.params;

      if (!mongoose.Types.ObjectId.isValid(jewelleryType)) {
        return next(new ErrorHandler("Invalid jewellery type ID", 400));
      }

      const products = await ProductModel.find({ jewelleryType })
        .populate("jewelleryType", "name")
        .populate("productCategory", "name");

      res.status(200).json({
        message: "Products fetched successfully",
        data: products,
        totalProducts: products.length,
        success: true,
      });
    } catch (error) {
      console.error("Error in getProductsByJewelleryType:", error);
      next(new ErrorHandler("Error fetching products by jewellery type", 500));
    }
  }
);

export const getProductsByProductCategory = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { productCategory } = req.params;

      if (!mongoose.Types.ObjectId.isValid(productCategory)) {
        return next(new ErrorHandler("Invalid product category ID", 400));
      }

      const products = await ProductModel.find({ productCategory })
        .populate("productCategory", "name")
        .populate("jewelleryType", "name");

      res.status(200).json({
        message: "Products fetched successfully",
        data: products,
        totalProducts: products.length,
        success: true,
      });
    } catch (error) {
      console.error("Error in getProductsByProductCategory:", error);
      next(new ErrorHandler("Error fetching products by category", 500));
    }
  }
);

export const getBestsellerProducts = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const products = await ProductModel.find({ bestseller: "Yes" })
        .populate("productCategory", "name")
        .populate("jewelleryType", "name");

      res.status(200).json({
        message: "Bestseller products fetched successfully",
        data: products,
        totalProducts: products.length,
        success: true,
      });
    } catch (error) {
      next(new ErrorHandler("Error fetching bestseller products", 500));
    }
  }
);

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
      product_id,
      name,
      description,
      jewelleryType,
      productCategory,
      metal,
      metalColour,
      bestseller,
      gram,
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

    product.product_id = product_id || product.product_id;
    product.name = name || product.name;
    product.description = description || product.description;
    if (jewelleryType) {
      product.jewelleryType = JSON.parse(jewelleryType);
    }
    if (productCategory) {
      product.productCategory = JSON.parse(productCategory);
    }
    product.metal = metal || product.metal;
    product.metalColour = metalColour || product.metalColour;
    if (gram !== undefined) {
      const parsedGram = parseFloat(gram); // Convert gram to number
      if (isNaN(parsedGram)) {
        return next(new ErrorHandler("Gram must be a valid number", 400));
      }
      if (parsedGram < 0) {
        return next(new ErrorHandler("Gram cannot be negative", 400));
      }
      product.gram = parsedGram;
    }
    product.bestseller = bestseller || product.bestseller;

    const updatedProduct = await product.save();

    await createNotification(`Product updated: ${updatedProduct.name}`);

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

    await User.updateMany(
      {},
      {
        $pull: {
          shoppingCart: deleteId,
          shoppingWishlist: deleteId,
        },
      }
    );

    await CartProductModel.deleteMany({ productId: deleteId });
    await wishListProductModel.deleteMany({ productId: deleteId });

    await createNotification(`Product deleted: ${product.name || product._id}`);
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
  await createNotification(
    `New review for ${product.name} by ${req.user.name}`
  );
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
