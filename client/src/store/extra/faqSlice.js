import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/api/faqs";

export const fetchFAQs = createAsyncThunk(
  "faq/fetchFAQs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createFAQ = createAsyncThunk(
  "faq/createFAQ",
  async (faqData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(API_URL, faqData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFAQ = createAsyncThunk(
  "faq/updateFAQ",
  async ({ id, faqData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.put(`${API_URL}/${id}`, faqData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFAQ = createAsyncThunk(
  "faq/deleteFAQ",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    faqs: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.faqs.push(action.payload);
        state.success = true;
      })
      .addCase(updateFAQ.fulfilled, (state, action) => {
        state.faqs = state.faqs.map((faq) =>
          faq._id === action.payload._id ? action.payload : faq
        );
        state.success = true;
      })
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.faqs = state.faqs.filter((faq) => faq._id !== action.payload);
      });
  },
});

export default faqSlice.reducer;
