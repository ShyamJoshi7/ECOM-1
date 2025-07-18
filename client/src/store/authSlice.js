import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        success: false,
        message:
          err.response?.data?.message || err.message || "Registration failed",
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        success: false,
        message: err.response?.data?.message || err.message || "Login failed",
      });
    }
  }
);

export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
  try {
    const response = await axios.get("http://localhost:5000/auth/check-auth", {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Check auth failed" };
  }
});

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
