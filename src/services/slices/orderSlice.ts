import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

interface OrderState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: any | null;
  orderNumber: string | null;
  ingredientCounts: { [key: string]: number };
}

const initialState: OrderState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  orderNumber: null,
  ingredientCounts: {}
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        if (state.bun) {
          state.ingredientCounts[state.bun._id] = 0; // Сброс количества старой булки
        }
        state.bun = { ...action.payload, uuid: uuidv4() }; // Добавляем uuid для новой булки
        state.ingredientCounts[action.payload._id] = 1; // Установка количества новой булки в 1
      } else {
        const newIngredient = { ...action.payload, uuid: uuidv4() };
        state.ingredients.push(newIngredient);
        if (state.ingredientCounts[action.payload._id]) {
          state.ingredientCounts[action.payload._id]++;
        } else {
          state.ingredientCounts[action.payload._id] = 1;
        }
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.uuid === action.payload
      );
      if (ingredientIndex !== -1) {
        const ingredientId = state.ingredients[ingredientIndex]._id;
        state.ingredients.splice(ingredientIndex, 1);

        if (state.ingredientCounts[ingredientId] > 0) {
          state.ingredientCounts[ingredientId]--;
        }
      }
    },
    clearOrder: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.ingredientCounts = {};
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<any>) => {
      state.orderModalData = action.payload;
    },
    setOrderNumber: (state, action: PayloadAction<string>) => {
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
  setOrderNumber,
  moveIngredientUp,
  moveIngredientDown
} = orderSlice.actions;
export default orderSlice.reducer;
