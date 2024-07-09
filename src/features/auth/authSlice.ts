// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

// interface AuthState {
//   isAuthenticated: boolean;
//   user: { name: string; email: string } | null;
//   users: { email: string; password: string; name: string }[];
// }

// interface AuthState {
//   isAuthenticated: boolean;
//   user: User | null;
// }

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
//   users: [],
// };

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
// };

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post(
      "http://localhost:5000/auth/login",
      credentials
    );
    return response.data;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: { name: string; email: string; password: string }) => {
    const response = await axios.post(
      "http://localhost:5000/auth/signup",
      userData
    );
    return response.data;
  }
);

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (
//       state,
//       action: PayloadAction<{ email: string; password: string }>
//     ) => {
//       console.log("action.payload.email  = ", action.payload.email);
//       console.log("action.payload.password  = ", action.payload.password);

//       const user = state.users.find(
//         (u) =>
//           u.email === action.payload.email &&
//           u.password === action.payload.password
//       );
//       if (user) {
//         state.isAuthenticated = true;
//         state.user = { name: user.name, email: user.email };
//       } else {
//         console.log("not match please sing on");
//       }
//     },
//     signup: (
//       state,
//       action: PayloadAction<{ name: string; email: string; password: string }>
//     ) => {
//       state.users.push(action.payload);
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<User>) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Signup failed";
      });
  },
});

// export const { login, logout } = authSlice.actions;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
