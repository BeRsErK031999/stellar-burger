import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import {
  loginUserApi,
  registerUserApi,
  updateUserApi,
  getUserApi,
  TLoginData,
  TRegisterData,
  TAuthResponse,
  TUserResponse
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
      state.isAuthenticated = true; // Убедитесь, что состояние обновляется
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
      state.isAuthenticated = true; // Убедитесь, что состояние обновляется
      state.isLoading = false;
      state.hasError = false;
    },
    registerFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    updateUserRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    updateUserSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    updateUserFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    fetchUserRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    fetchUserSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true; // Убедитесь, что состояние обновляется
      state.isLoading = false;
      state.hasError = false;
    },
    fetchUserFailed: (state) => {
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
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailed,
  logout
} = userSlice.actions;

export const loginUser =
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

export const registerUser =
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

export const updateUser =
  (data: Partial<TRegisterData>): AppThunk =>
  async (dispatch) => {
    dispatch(updateUserRequest());
    try {
      const response: TUserResponse = await updateUserApi(data);
      dispatch(updateUserSuccess(response.user));
    } catch (error) {
      dispatch(updateUserFailed());
    }
  };

export const fetchUser = (): AppThunk => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response: TUserResponse = await getUserApi();
    dispatch(fetchUserSuccess(response.user));
  } catch (error) {
    dispatch(fetchUserFailed());
  }
};

export default userSlice.reducer;
