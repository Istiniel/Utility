import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { GoodsType } from '../../../API/API';

type CartState = {
  goods: Array<GoodsType>;
};

const initialState: CartState = {
  goods: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<GoodsType>) => {
      state.goods = [action.payload, ...state.goods];
    },
    deleteItem: (state, action: PayloadAction<number | string>) => {
      state.goods = state.goods.filter((item) => {
        return item.id !== action.payload;
      });
    },

    clearCart: (state) => {
      state.goods = [];
    },
  },
});

export const { deleteItem, addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartContent = (state: RootState) => state.cart.goods;
