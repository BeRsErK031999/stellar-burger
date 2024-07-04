import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import thunk from 'redux-thunk';
import ingredientsReducer from './slices/ingredientsSlice'; // Импортируйте ваш срез ингредиентов

// Добавьте другие редьюсеры, если они есть
const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  // Добавьте другие редьюсеры здесь
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type RootState = ReturnType<typeof rootReducer>;
export type TApplicationActions = any; // Обновите с реальными типами actions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
