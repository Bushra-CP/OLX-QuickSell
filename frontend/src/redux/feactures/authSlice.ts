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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
          state.error = "Authentication failed";
          state.success = false;
        },
      );
  },
});

export const { updateAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
