import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

interface IngredientsState {
  items: TIngredient[];
  isLoading: boolean;
  hasError: boolean;
  selectedIngredient: TIngredient | null;
}

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  hasError: false,
  selectedIngredient: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientsRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    getIngredientsSuccess: (state, action: PayloadAction<TIngredient[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    getIngredientsFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    setSelectedIngredient: (
      state,
      action: PayloadAction<TIngredient | null>
    ) => {
      state.selectedIngredient = action.payload;
    }
  }
});

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  setSelectedIngredient
} = ingredientsSlice.actions;

export const fetchIngredients = (): AppThunk => async (dispatch) => {
  dispatch(getIngredientsRequest());
  try {
    const ingredients = await getIngredientsApi();
    dispatch(getIngredientsSuccess(ingredients));
  } catch (error) {
    dispatch(getIngredientsFailed());
  }
};

export default ingredientsSlice.reducer;
