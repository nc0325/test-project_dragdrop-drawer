import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import feedbacksService from './feedbacksService';

const initialState = {
  feedbacks: null,
  feedbacksCount: 0,
  feedbacksStats: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFeedbacksStatsLoading: false,
  message: '',
};

export const getFeedbacks = createAsyncThunk(
  'feedbacks/getFeedbacks',
  async (params, thunkApi) => {
    try {
      return await feedbacksService.getFeedbacks(params);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getFeedbacksStats = createAsyncThunk(
  'feedbacks/getFeedbacksStats',
  async (_, thunkApi) => {
    try {
      return await feedbacksService.getFeedbacksStats();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    reset: (state) => {
      state.feedbacks = null;
      state.feedbacksCount = 0;
      state.feedbacksStats = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isFeedbacksStatsLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbacks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.feedbacksCount = action.payload.meta.total;
      })
      .addCase(getFeedbacks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.feedbacks = null;
        state.feedbacksCount = 0;
      })
      .addCase(getFeedbacksStats.pending, (state) => {
        state.isFeedbacksStatsLoading = true;
      })
      .addCase(getFeedbacksStats.fulfilled, (state, action) => {
        state.feedbacksStats = action.payload.data;
        state.isFeedbacksStatsLoading = false;
      })
      .addCase(getFeedbacksStats.rejected, (state, action) => {
        state.isFeedbacksStatsLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.feedbacksStats = {};
      });
  },
});

export const {reset} = feedbacksSlice.actions;
export default feedbacksSlice.reducer;
