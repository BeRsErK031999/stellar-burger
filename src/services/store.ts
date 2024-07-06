import {
  configureStore,
  combineReducers,
  Middleware,
  AnyAction
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorItemsReducer from './slices/constructorItemsSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  user: userReducer,
  order: orderReducer
});

const middleware: Middleware<{}, any, any>[] = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type TApplicationActions = any; // Update with actual action types
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
