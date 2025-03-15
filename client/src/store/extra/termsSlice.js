import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/api/terms";

export const fetchTerms = createAsyncThunk(
  "terms/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const createTerms = createAsyncThunk(
  "terms/create",
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        API_URL,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateTerms = createAsyncThunk(
  "terms/update",
  async ({ id, title, content }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        `${API_URL}/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const deleteTerms = createAsyncThunk(
  "terms/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const termsSlice = createSlice({
  name: "terms",
  initialState: {
    policies: [],
    loading: false,
    error: null,
    successMessage: null,
    success: false,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTerms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTerms.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = action.payload;
      })
      .addCase(fetchTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTerms.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTerms.fulfilled, (state, action) => {
        state.loading = false;
        state.policies.push(action.payload.newPolicy);
        state.successMessage = action.payload.message;
        state.success = true;
      })
      .addCase(createTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(updateTerms.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTerms.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPolicy = action.payload.policy;
        state.policies = state.policies.map((policy) =>
          policy._id === updatedPolicy._id ? updatedPolicy : policy
        );
        state.successMessage = action.payload.message;
        state.success = true;
      })
      .addCase(updateTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(deleteTerms.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTerms.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = state.policies.filter(
          (policy) => policy._id !== action.meta.arg.id
        );
        state.successMessage = action.payload.message;
        state.success = true;
      })
      .addCase(deleteTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearMessages } = termsSlice.actions;
export default termsSlice.reducer;
