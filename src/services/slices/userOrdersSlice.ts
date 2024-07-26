import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { fetchOrdersApi } from './ordersApi';
import { RootState, AppDispatch } from '../store';
import { AnyAction } from '@reduxjs/toolkit';

interface UserOrdersState {
  orders: TOrder[];
  loading: boolean; // обновлено
  error: string | null;
}

const initialState: UserOrdersState = {
  orders: [],
  loading: false, // обновлено
  error: null
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    fetchUserOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserOrdersSuccess: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchUserOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchUserOrdersStart,
  fetchUserOrdersSuccess,
  fetchUserOrdersFailure
} = userOrdersSlice.actions;

export const fetchUserOrders =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchUserOrdersStart());
    try {
      const data = await fetchOrdersApi(); // Здесь должен быть запрос на получение заказов пользователя
      dispatch(fetchUserOrdersSuccess(data.orders));
    } catch (error) {
      dispatch(fetchUserOrdersFailure(String(error)));
    }
  };

export default userOrdersSlice.reducer;
