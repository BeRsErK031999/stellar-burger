import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

interface OrderState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: any | null;
  orderNumber: string | null; // Добавлено
}

const initialState: OrderState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  orderNumber: null // Добавлено
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload, uuid: uuidv4() });
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.uuid !== action.payload
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
    },
    setOrderNumber: (state, action: PayloadAction<string>) => {
      // Добавлено
      state.orderNumber = action.payload;
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredient);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredient);
      }
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearOrder,
  setOrderRequest,
  setOrderModalData,
  setOrderNumber, // Добавлено
  moveIngredientUp,
  moveIngredientDown
} = orderSlice.actions;
export default orderSlice.reducer;
