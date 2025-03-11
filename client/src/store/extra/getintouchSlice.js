import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/contact/submit",
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to submit contact form!" }
      );
    }
  }
);

export const getContactForms = createAsyncThunk(
  "contact/getContactForms",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/contact/see", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to get contact forms!" }
      );
    }
  }
);

export const deleteContactForms = createAsyncThunk(
  "contact/deleteContactForms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/api/contact/deleteold");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete contact forms!" }
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Failed to submit contact form!";
        state.loading = false;
      })

      .addCase(getContactForms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContactForms.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getContactForms.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to get contact forms!";
        state.loading = false;
      })

      .addCase(deleteContactForms.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContactForms.fulfilled, (state) => {
        state.contacts = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteContactForms.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Failed to delete contact forms!";
        state.loading = false;
      });
  },
});

export const { clearError } = contactSlice.actions;
export default contactSlice.reducer;
