import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/api/privacy";

export const fetchPrivacyPolicies = createAsyncThunk(
  "privacyPolicy/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const createPrivacyPolicy = createAsyncThunk(
  "privacyPolicy/create",
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

export const updatePrivacyPolicy = createAsyncThunk(
  "privacyPolicy/update",
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

export const deletePrivacyPolicy = createAsyncThunk(
  "privacyPolicy/delete",
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

const privacyPolicySlice = createSlice({
  name: "privacyPolicy",
  initialState: {
    policies: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivacyPolicies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrivacyPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = action.payload;
      })
      .addCase(fetchPrivacyPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPrivacyPolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.policies.push(action.payload.newPolicy);
        state.successMessage = action.payload.message;
      })
      .addCase(createPrivacyPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePrivacyPolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPolicy = action.payload.policy;
        state.policies = state.policies.map((policy) =>
          policy._id === updatedPolicy._id ? updatedPolicy : policy
        );
        state.successMessage = action.payload.message;
      })
      .addCase(updatePrivacyPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePrivacyPolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = state.policies.filter(
          (policy) => policy._id !== action.meta.arg.id
        );
        state.successMessage = action.payload.message;
      })
      .addCase(deletePrivacyPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = privacyPolicySlice.actions;
export default privacyPolicySlice.reducer;
