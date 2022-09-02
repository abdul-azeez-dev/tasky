import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  user: null | IUserState;
}
export interface IUserState {
  name: string;
  user: number;
  token: string;
}

const initialState: IinitialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Action creator
export const { login, logout } = authSlice.actions;

// reducer
export default authSlice.reducer;
