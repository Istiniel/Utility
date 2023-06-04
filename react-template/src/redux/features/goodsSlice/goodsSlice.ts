import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchGoodsList, GoodsType } from '../../../API/API';

type GoodsListState = {
  goods: Array<GoodsType>;
  status: 'idle' | 'loading' | 'failed';
  fetchFailedMessage: string;

  sortedGoods: Array<GoodsType>;
  priceRange: { min: number; max: number };
  activeTag: string;
  producerTags: (string | null)[];
};

const initialState: GoodsListState = {
  goods: [],
  status: 'idle',
  fetchFailedMessage: '',

  sortedGoods: [],
  priceRange: { min: 0, max: 1000 },
  activeTag: '',
  producerTags: [],
};

export const fetchGoods = createAsyncThunk('goodsList/fetchGoods', async () => {
  const goods = localStorage.getItem('goods');
  if (goods) {
    if (JSON.parse(goods).length > 0) {
      return JSON.parse(goods) as GoodsType[];
    }
  }

  const response = await fetchGoodsList();
  response && localStorage.setItem('goods', JSON.stringify(response));
  return response;
});

export const goodsListSlice = createSlice({
  name: 'goodsList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<GoodsType>) => {
      const existedProduct = state.sortedGoods.filter((item) => item.id === action.payload.id)[0];

      if (existedProduct) {
        state.sortedGoods = state.sortedGoods.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        return;
      }

      state.sortedGoods.push(action.payload);
    },

    deleteItem: (state, action: PayloadAction<number | string>) => {
      state.sortedGoods = state.sortedGoods.filter((item) => {
        return item.id !== action.payload;
      });
    },

    filterByTag: (state, action: PayloadAction<string>) => {
      state.activeTag = action.payload ? action.payload : '';
    },

    filterByProducers: (state, action: PayloadAction<(string | null)[]>) => {
      state.producerTags = action.payload;
    },

    filterByPriceRange: (
      state,
      action: PayloadAction<{
        min: number;
        max: number;
      }>
    ) => {
      state.priceRange = action.payload;
    },

    sortByName: (state) => {
      state.sortedGoods = state.sortedGoods.sort((item1, item2) => {
        return item1.brand.localeCompare(item2.brand);
      });
    },

    sortByPrice: (state) => {
      state.sortedGoods = state.sortedGoods.sort((item1, item2) => {
        return item1.price > item2.price ? 1 : -1;
      });
    },

    sortByDescendingPrice: (state) => {
      state.sortedGoods = state.sortedGoods.sort((item1, item2) => {
        return item1.price > item2.price ? -1 : 1;
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
        state.sortedGoods = action.payload;
      })
      .addCase(fetchGoods.rejected, (state) => {
        state.status = 'failed';
        state.fetchFailedMessage = 'failed to fetch data';
      });
  },
});

export const {
  deleteItem,
  filterByTag,
  sortByName,
  sortByPrice,
  sortByDescendingPrice,
  filterByPriceRange,
  filterByProducers,
  addItem,
} = goodsListSlice.actions;
export default goodsListSlice.reducer;

export const selectGoods = (state: RootState) => state.goodsList.goods;
export const selectSortedGoods = (state: RootState) => state.goodsList.sortedGoods;
export const selectPriceRange = (state: RootState) => state.goodsList.priceRange;
export const selectActiveTag = (state: RootState) => state.goodsList.activeTag;
export const selectProducerTags = (state: RootState) => state.goodsList.producerTags;

export const selectFilteredState = createSelector(
  [selectSortedGoods, selectPriceRange, selectActiveTag, selectProducerTags],
  (goods, priceRange, activeTage, producerTags) => {
    const { min, max } = priceRange;
    goods = goods.filter((item) => {
      return item.price > min && item.price < max;
    });

    if (producerTags.length > 0) {
      goods = goods.filter((item) => {
        return producerTags.includes(item.producer);
      });
    }

    goods = goods.filter((item) => {
      if (!activeTage) return true;
      return item.tags.indexOf(activeTage) !== -1;
    });

    return goods;
  }
);
