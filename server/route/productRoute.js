import { Router } from "express";
import admin from "../middleware/Admin.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  createProduct,
  deleteProduct,
  deleteProductReview,
  getBestsellerProducts,
  getProductReviews,
  getProducts,
  getProductsByJewelleryType,
  getProductsByProductCategory,
  getSimilarProducts,
  getSingleProduct,
  postProductReview,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.post(
  "/new",
  auth,
  admin,
  upload.array("images", 10),
  createProduct
);

productRouter.get("/get", getProducts);

productRouter.get("/get/:productId", getSingleProduct);

productRouter.get("/get/:jewelleryType", getProductsByJewelleryType);

productRouter.get("/get/:productCategory", getProductsByProductCategory);

productRouter.get("/get/bestseller", getBestsellerProducts);

productRouter.put(
  "/update/:id",
  auth,
  admin,
  upload.array("images", 10),
  updateProduct
);

productRouter.delete("/delete/:deleteId", auth, admin, deleteProduct);

productRouter.get("/similar", getSimilarProducts);

productRouter.get("/reviews/:productId", getProductReviews);

productRouter.post("/review/:productId", auth, postProductReview);

productRouter.delete("/review/:productId/:reviewId", auth, deleteProductReview);

export default productRouter;
