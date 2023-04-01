import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import goodsListReducer from './features/goodsList/goodsSlice';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    goodsList: goodsListReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
