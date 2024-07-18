import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { fetchOrdersApi } from './ordersApi';
import { RootState, AppDispatch } from '../store';
import { AnyAction } from '@reduxjs/toolkit';

interface OrderFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: OrderFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
      }>
    ) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.loading = false;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setOrders: (
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
      }>
    ) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  setOrders
} = orderFeedSlice.actions;

export const fetchOrders =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchOrdersStart());
    try {
      const data = await fetchOrdersApi();
      dispatch(fetchOrdersSuccess(data));
    } catch (error) {
      dispatch(fetchOrdersFailure(String(error)));
    }
  };

// WebSocket логика
export const startOrderFeed =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch: AppDispatch) => {
    const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');

    ws.onmessage = (event) => {
      const { orders, total, totalToday } = JSON.parse(event.data);
      dispatch(setOrders({ orders, total, totalToday }));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  };

export const stopOrderFeed =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch: AppDispatch) => {
    // Логика остановки WebSocket соединения, если необходимо
  };

export default orderFeedSlice.reducer;
