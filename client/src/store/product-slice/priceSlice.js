import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api";

const API_URL = "/api/price";

// Add Price Thunk
export const addPrice = createAsyncThunk(
  "price/addPrice",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.post(`${API_URL}/add`, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get Price Thunk
export const getPrice = createAsyncThunk(
  "price/getPrice",
  async (metal, { rejectWithValue }) => {
    try {
      // Optional: Remove or comment out this debug log in production
      console.log("Fetching price for:", metal);
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`${API_URL}/get/${metal}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update Price Thunk
export const updatePrice = createAsyncThunk(
  "price/updatePrice",
  async ({ metal, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.put(`${API_URL}/update/${metal}`, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const priceSlice = createSlice({
  name: "price",
  initialState: {
    priceData: null,
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
      // addPrice Cases
      .addCase(addPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.priceData = action.payload;
      })
      .addCase(addPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getPrice Cases
      .addCase(getPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.priceData = action.payload;
      })
      .addCase(getPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updatePrice Cases
      .addCase(updatePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.priceData = action.payload;
      })
      .addCase(updatePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = priceSlice.actions;
export default priceSlice.reducer;
