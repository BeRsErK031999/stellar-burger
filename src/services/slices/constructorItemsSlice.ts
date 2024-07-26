import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface ConstructorItemsState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorItemsState = {
  bun: null,
  ingredients: []
};

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    },
    setBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.bun = action.payload;
    }
    // Добавьте другие редьюсеры по мере необходимости
  }
});

export const { addItem, setBun } = constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
