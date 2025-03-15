import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api";

const API_URL = "/api/photo";

export const uploadPhoto = createAsyncThunk(
  "photo/uploadPhoto",
  async (photoFile, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("photo", photoFile);
      const response = await axiosInstance.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Upload failed");
    }
  }
);

export const deletePhoto = createAsyncThunk(
  "photo/deletePhoto",
  async (photoId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(`${API_URL}/${photoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { photoId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

export const fetchAllPhotos = createAsyncThunk(
  "photo/fetchAllPhotos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

const photoSlice = createSlice({
  name: "photo",
  initialState: {
    photos: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearPhotoState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(uploadPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.loading = false;

        state.photos.push(action.payload.data);
        state.successMessage = action.payload.message;
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = state.photos.filter(
          (photo) => photo._id !== action.payload.photoId
        );
        state.successMessage = action.payload.data.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPhotos.fulfilled, (state, action) => {
        state.loading = false;

        state.photos = action.payload.data;
        state.successMessage = action.payload.message;
      })
      .addCase(fetchAllPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPhotoState } = photoSlice.actions;
export default photoSlice.reducer;
