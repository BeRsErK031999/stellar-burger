import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  items: TIngredient[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  hasError: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export default ingredientsSlice.reducer;
