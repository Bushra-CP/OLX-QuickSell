import type { UserInterface } from "@/types/userInterface";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: UserInterface | null;
  accessToken: string | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

type AuthResponse = {
  user: UserInterface;
  accessToken: string;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  success: false,
  error: null,
};

//SIGNUP THUNK
export const signup = createAsyncThunk<AuthResponse, UserInterface>(
  "signup/signupSlice",
  async (userData: UserInterface) => {
    const res = await axios.post(
      "http://localhost:3000/quickSell/user/signup",
      userData,
      { withCredentials: true },
    );
    return res.data;
  },
);

//LOGIN THUNK
export const login = createAsyncThunk<AuthResponse, UserInterface>(
  "login/LoginSlice",
  async (userData: UserInterface) => {
    const res = await axios.post(
      "http://localhost:3000/quickSell/user/login",
      userData,
      { withCredentials: true },
    );
    return res.data;
  },
);

//LOGOUT THUNK
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        "http://localhost:3000/quickSell/user/logout",
        {},
        { withCredentials: true },
      );
      return true;
    } catch (err) {
      return rejectWithValue(`Logout failed": ${err}`);
    }
  },
);

//SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.success = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.success = false;
      });
  },
});

export const { updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
