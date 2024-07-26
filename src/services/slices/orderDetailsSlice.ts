import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { RootState, AppDispatch } from '../store';
import { AnyAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';

interface OrderDetailsState {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderDetailsState = {
  order: null,
  isLoading: false,
  error: null
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    fetchOrderDetailsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrderDetailsSuccess: (state, action: PayloadAction<TOrder>) => {
      state.order = action.payload;
      state.isLoading = false;
    },
    fetchOrderDetailsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchOrderDetailsStart,
  fetchOrderDetailsSuccess,
  fetchOrderDetailsFailure
} = orderDetailsSlice.actions;

export const fetchOrderById =
  (id: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchOrderDetailsStart());
    try {
      const data = await getOrderByNumberApi(parseInt(id));
      dispatch(fetchOrderDetailsSuccess(data.orders[0]));
    } catch (error) {
      dispatch(fetchOrderDetailsFailure(String(error)));
    }
  };

export default orderDetailsSlice.reducer;
