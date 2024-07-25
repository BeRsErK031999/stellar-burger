import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { RootState, AppDispatch } from '../store';
import { AnyAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';

interface OrderDetailsFullState {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderDetailsFullState = {
  order: null,
  isLoading: false,
  error: null
};

const orderDetailsFullSlice = createSlice({
  name: 'orderDetailsFull',
  initialState,
  reducers: {
    fetchOrderDetailsFullStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrderDetailsFullSuccess: (state, action: PayloadAction<TOrder>) => {
      state.order = action.payload;
      state.isLoading = false;
    },
    fetchOrderDetailsFullFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchOrderDetailsFullStart,
  fetchOrderDetailsFullSuccess,
  fetchOrderDetailsFullFailure
} = orderDetailsFullSlice.actions;

export const fetchOrderFullById =
  (id: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchOrderDetailsFullStart());
    try {
      const data = await getOrderByNumberApi(parseInt(id));
      dispatch(fetchOrderDetailsFullSuccess(data.orders[0]));
    } catch (error) {
      dispatch(fetchOrderDetailsFullFailure(String(error)));
    }
  };

export default orderDetailsFullSlice.reducer;
