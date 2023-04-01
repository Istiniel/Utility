import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchGoodsList, GoodsType } from '../../../API/API';

type GoodsListState = {
  goods: Array<GoodsType>;
  status: 'idle' | 'loading' | 'failed';
  fetchFailedMessage: string;
};

const initialState: GoodsListState = {
  goods: [],
  status: 'idle',
  fetchFailedMessage: '',
};

export const fetchGoods = createAsyncThunk('goodsList/fetchGoods', async () => {
  const goods = localStorage.getItem('goods');
  if (goods) {
    return JSON.parse(goods) as GoodsType[];
  }

  const response = await fetchGoodsList();
  response && localStorage.setItem('goods', JSON.stringify(response));
  return response;
});

export const goodsListSlice = createSlice({
  name: 'goodsList',
  initialState,
  reducers: {
    deleteItem: (state, action: PayloadAction<number | string>) => {
      state.goods = state.goods.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'idle';
        state.goods = action.payload;
      })
      .addCase(fetchGoods.rejected, (state) => {
        state.status = 'failed';
        state.fetchFailedMessage = 'failed to fetch data';
      });
  },
});

export const { deleteItem } = goodsListSlice.actions;
export default goodsListSlice.reducer;

export const selectGoods = (state: RootState) => state.goodsList.goods;
