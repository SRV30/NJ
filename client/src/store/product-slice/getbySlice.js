import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "/api/product";

export const fetchProductsByJewelleryType = createAsyncThunk(
  "products/fetchByJewelleryType",
  async (jewelleryType, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${API_BASE_URL}/get/${jewelleryType}`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (productCategory, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${API_BASE_URL}/get/${productCategory}`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchBestsellerProducts = createAsyncThunk(
  "products/fetchBestseller",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${API_BASE_URL}/get/bestseller`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "getproducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch by jewellery type
      .addCase(fetchProductsByJewelleryType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByJewelleryType.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByJewelleryType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by product category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch bestseller products
      .addCase(fetchBestsellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBestsellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchBestsellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
