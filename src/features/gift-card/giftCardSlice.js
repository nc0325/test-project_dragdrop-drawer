import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import giftCardService from './giftCardService';

const initialState = {
  giftCards: [],
  giftCardsCount: 0,
  giftCardsStats: {},
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isGiftCardsStatsLoading: false,
  message: '',
};

export const getGiftCards = createAsyncThunk(
  'giftCard/getGiftCards',
  async (params, thunkApi) => {
    try {
      return await giftCardService.getGiftCards(params);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getGiftCardsStats = createAsyncThunk(
  'giftCard/getGiftCardsStats',
  async (params, thunkApi) => {
    try {
      return await giftCardService.getGiftCardsStats(params);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const createGiftCard = createAsyncThunk(
  'giftCard/createGiftCard',
  async (data, thunkApi) => {
    try {
      return await giftCardService.createGiftCard(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const giftCardSlice = createSlice({
  name: 'giftCard',
  initialState,
  reducers: {
    reset: (state) => {
      state.giftCards = [];
      state.giftCardsCount = 0;
      state.giftCardsStats = {};
      state.data = null;
      state.isLoading = false;
      state.isGiftCardsStatsLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGiftCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGiftCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.giftCards = action.payload.data;
        state.giftCardsCount = action.payload.meta.total;
      })
      .addCase(getGiftCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.giftCards = null;
      })
      .addCase(getGiftCardsStats.pending, (state) => {
        state.isGiftCardsStatsLoading = true;
      })
      .addCase(getGiftCardsStats.fulfilled, (state, action) => {
        state.giftCardsStats = action.payload.data;
        state.isGiftCardsStatsLoading = false;
      })
      .addCase(getGiftCardsStats.rejected, (state, action) => {
        state.isGiftCardsStatsLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.giftCardsStats = {};
      })
      .addCase(createGiftCard.pending, (state) => {
        state.isLoading = true;
        state.data = null;
      })
      .addCase(createGiftCard.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(createGiftCard.rejected, (state, action) => {
        state.data = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const {reset} = giftCardSlice.actions;
export default giftCardSlice.reducer;
