import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import {
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  TAuthResponse
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';

interface UserState {
  isAuthenticated: boolean;
  user: TUser | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  hasError: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    loginSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.hasError = false;
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    registerRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    registerSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.hasError = false;
    },
    registerFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  registerRequest,
  registerSuccess,
  registerFailed,
  logout
} = userSlice.actions;

const loginUser =
  (data: TLoginData): AppThunk =>
  async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response: TAuthResponse = await loginUserApi(data);
      dispatch(loginSuccess(response.user));
    } catch (error) {
      dispatch(loginFailed());
    }
  };

const registerUser =
  (data: TRegisterData): AppThunk =>
  async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response: TAuthResponse = await registerUserApi(data);
      dispatch(registerSuccess(response.user));
    } catch (error) {
      dispatch(registerFailed());
    }
  };

export { loginUser, registerUser };

export default userSlice.reducer;
