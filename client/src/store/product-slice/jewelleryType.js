// src/store/jewellery-slice/jewelleryType.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api";

const API_URL = "/api/jewellery";

export const addJewelleryCategory = createAsyncThunk(
  "jewellery/addCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.post(`${API_URL}/add`, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const fetchJewelleryCategories = createAsyncThunk(
  "jewellery/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateJewelleryCategory = createAsyncThunk(
  "jewellery/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.put(`${API_URL}/update/${id}`, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteJewelleryCategory = createAsyncThunk(
  "jewellery/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.delete(`${API_URL}/delete/${id}`, config);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const jewellerySlice = createSlice({
  name: "jewellery",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Add Jewellery Category
    builder
      .addCase(addJewelleryCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addJewelleryCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.category);
        state.success = true;
      })
      .addCase(addJewelleryCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Jewellery Categories
      .addCase(fetchJewelleryCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJewelleryCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchJewelleryCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Jewellery Category
      .addCase(updateJewelleryCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateJewelleryCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload.category._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload.category;
        }
        state.success = true;
      })
      .addCase(updateJewelleryCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Jewellery Category
      .addCase(deleteJewelleryCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteJewelleryCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteJewelleryCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = jewellerySlice.actions;
export default jewellerySlice.reducer;