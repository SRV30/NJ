import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api";

const API_URL = "/api/category";

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.post(
        `${API_URL}/add`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.put(
        `${API_URL}/update/${id}`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.delete(
        `${API_URL}/delete/${id}`,
        config
      );
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
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
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.category);
        state.success = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload.category._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload.category;
        }
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = categorySlice.actions;
export default categorySlice.reducer;
