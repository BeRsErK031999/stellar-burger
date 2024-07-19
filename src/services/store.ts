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
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorItemsReducer from './slices/constructorItemsSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import orderFeedReducer from './slices/orderFeedSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  user: userReducer,
  order: orderReducer,
  orderFeed: orderFeedReducer,
  orderDetails: orderDetailsReducer
});

const middleware: Middleware<{}, any, any>[] = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type TApplicationActions = AnyAction; // Используйте AnyAction для типизации действий
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
