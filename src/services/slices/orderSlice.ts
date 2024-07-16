import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

interface OrderState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  orderRequest: boolean;
  orderModalData: any | null;
}

const initialState: OrderState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    clearOrder: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<any>) => {
      state.orderModalData = action.payload;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearOrder,
  setOrderRequest,
  setOrderModalData
} = orderSlice.actions;
export default orderSlice.reducer;
