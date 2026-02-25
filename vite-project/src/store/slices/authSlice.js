import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, storeToken, storeUser, getStoredToken, getStoredUser, logoutUser as clearStorage } from "../../services/Auth";

/**
 * Async thunk for user login
 */
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      
      // Store token and user data
      if (response.token) {
        storeToken(response.token);
      }
      if (response.user) {
        storeUser(response.user);
      }
      
      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Login failed. Please check your credentials."
      );
    }
  }
);

/**
 * Async thunk for user logout
 */
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      clearStorage();
      return null;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

/**
 * Initial state
 */
const initialState = {
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  loading: false,
  error: null,
};

/**
 * Auth slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token || state.token;
        state.user = action.payload.user || state.user;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Login failed";
      })
      // Logout cases
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
