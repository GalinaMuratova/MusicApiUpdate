import { GlobalError, User, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { login, register } from './usersThunk';

interface UsersState {
  user: User | null,
  registerLoading: boolean,
  registerError: ValidationError | null,
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: userResponse}) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(register.rejected, (state,  {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.usersReducer.user;
export const selectRegisterLoading = (state: RootState) => state.usersReducer.registerLoading;
export const selectRegisterError = (state: RootState) => state.usersReducer.registerError;
export const selectLoginLoading = (state: RootState) => state.usersReducer.loginLoading;
export const selectLoginError = (state: RootState) => state.usersReducer.loginError;