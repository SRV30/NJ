import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/api/product";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(`${API_URL}/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/get`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/get/${productId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        `${API_URL}/update/${id}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (deleteId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(
        `${API_URL}/delete/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ...response.data, deleteId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Product deleted successfully."
      );
    }
  }
);

export const getSimilarProducts = createAsyncThunk(
  "product/getSimilarProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/similar`);
      return response.data.similarProducts;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProductReviews = createAsyncThunk(
  "product/getProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}/reviews/${productId}`
      );
      return response.data.reviews;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const postProductReview = createAsyncThunk(
  "product/postProductReview",
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        `${API_URL}/review/${productId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { productId, review: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProductReview = createAsyncThunk(
  "product/deleteProductReview",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(
        `${API_URL}/review/${productId}/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { productId, reviewId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  products: [],
  currentProduct: null,
  similarProducts: [],
  productReviews: [],
  reviewPosting: false,
  loading: false,
  error: null,
  success: false,
  totalPages: 0,
  totalProducts: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    resetProductSuccess: (state) => {
      state.success = false;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (!Array.isArray(state.products)) {
          state.products = [];
        }
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data || [];
        state.totalPages = action.payload.totalPages || 0;
        state.totalProducts = action.payload.totalProducts || 0;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Product
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        state.currentProduct = action.payload;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.deleteId
        );
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Similar Products
      .addCase(getSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(getSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Product Reviews
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.productReviews = action.payload;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Post Product Review
      .addCase(postProductReview.pending, (state) => {
        state.reviewPosting = true;
      })
      .addCase(postProductReview.fulfilled, (state, action) => {
        state.reviewPosting = false;
        state.reviews.push(action.payload.review);
      })
      .addCase(postProductReview.rejected, (state, action) => {
        state.reviewPosting = false;
        state.error = action.payload;
      })

      // Delete Product Review
      .addCase(deleteProductReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the review from the reviews array
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload.reviewId
        );
      })
      .addCase(deleteProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductError, resetProductSuccess, clearCurrentProduct } =
  productSlice.actions;

export default productSlice.reducer;
