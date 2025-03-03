import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/user/login", credentials);

      const { token, user, verifyEmail } = response.data;

      localStorage.setItem("verifyEmail", verifyEmail);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token, verifyEmail };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/user/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Logout failed!" }
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/user/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error("Invalid response from server");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getSingleDetail = createAsyncThunk(
  "auth/getSingleDetail",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API Response:", response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data ||
          error.message || { message: "Get user details failed!" }
      );
    }
  }
);


const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token") || null;

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedToken,
  token: storedToken,
  loading: false,
  error: null,
  users: [],
  singleUser: null,
  totalUsers: 0,
  totalPages: 0,
  success: false,
  verifyEmail: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.verifyEmail = action.payload.verifyEmail;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed!";
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.verifyEmail = false;
        localStorage.removeItem("verifyEmail");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Logout failed!";
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getSingleDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getSingleDetail.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Fetching user details failed!";
      })
  }
});

export const { clearError, clearState } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
