import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import waitingListService from './waitingListService';

const initialState = {
  waitingListStats: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isWaitingListStatsLoading: false,
  message: '',
};

export const getWaitingListStats = createAsyncThunk(
  'waitingList/getWaitingListStats',
  async (params, thunkApi) => {
    try {
      return await waitingListService.getWaitingListStats(params);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const waitingListSlice = createSlice({
  name: 'waitingList',
  initialState,
  reducers: {
    reset: (state) => {
      state.waitingListStats = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isWaitingListStatsLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWaitingListStats.pending, (state) => {
        state.isWaitingListStatsLoading = true;
      })
      .addCase(getWaitingListStats.fulfilled, (state, action) => {
        state.waitingListStats = action.payload.data;
        state.isWaitingListStatsLoading = false;
      })
      .addCase(getWaitingListStats.rejected, (state, action) => {
        state.isWaitingListStatsLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.waitingListStats = {};
      });
  },
});

export const {reset} = waitingListSlice.actions;
export default waitingListSlice.reducer;
