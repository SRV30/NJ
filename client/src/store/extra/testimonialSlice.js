import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createTestimonial = createAsyncThunk(
  "testimonials/createTestimonial",
  async (testimonialData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/testimonials",
        testimonialData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    }
  }
);

export const getAllTestimonials = createAsyncThunk(
  "testimonials/getAllTestimonials",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/api/testimonials");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonials: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetTestimonials: (state) => {
      state.testimonials = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials.unshift(action.payload.testimonial);
        state.success = true;
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
        state.success = false;
      })
      .addCase(getAllTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload.testimonials;
      })
      .addCase(getAllTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      });
  },
});

export const { resetTestimonials } = testimonialSlice.actions;
export default testimonialSlice.reducer;
