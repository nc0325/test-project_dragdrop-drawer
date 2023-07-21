import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import customersEngagementService from './customersEngagementService';

const initialState = {
  customersEngagementStats: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getCustomersEngagementStats = createAsyncThunk(
  'customersEngagement/getCustomersEngagementStats',
  async (params, thunkApi) => {
    try {
      return await customersEngagementService.getCustomersEngagementStats(
        params,
      );
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const customersEngagementSlice = createSlice({
  name: 'customersEngagement',
  initialState,
  reducers: {
    reset: (state) => {
      state.customersEngagementStats = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomersEngagementStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomersEngagementStats.fulfilled, (state, action) => {
        state.customersEngagementStats = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getCustomersEngagementStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.customersEngagementStats = {};
      });
  },
});

export const {reset} = customersEngagementSlice.actions;
export default customersEngagementSlice.reducer;
