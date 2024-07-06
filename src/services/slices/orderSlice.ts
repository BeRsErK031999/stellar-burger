import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    }
    // Добавьте другие редьюсеры по мере необходимости
  }
});

export const { setOrderRequest, setOrderModalData } = orderSlice.actions;
export default orderSlice.reducer;
