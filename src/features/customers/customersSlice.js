import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import customersService from './customersService';

const initialState = {
  customers: null,
  customersCount: 0,
  customersStats: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCustomersStatsLoading: false,
  message: '',
};

export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async (params, thunkApi) => {
    try {
      return await customersService.getCustomers(params);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getCustomersStats = createAsyncThunk(
  'customers/getCustomersStats',
  async (params, thunkApi) => {
    try {
      return await customersService.getCustomersStats(params);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    reset: (state) => {
      state.customers = null;
      state.customersCount = 0;
      state.customersStats = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isCustomersStatsLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.customersCount = action.payload.meta.total;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.customers = null;
        state.customersCount = 0;
      })
      .addCase(getCustomersStats.pending, (state) => {
        state.isCustomersStatsLoading = true;
      })
      .addCase(getCustomersStats.fulfilled, (state, action) => {
        state.customersStats = action.payload.data;
        state.isCustomersStatsLoading = false;
      })
      .addCase(getCustomersStats.rejected, (state, action) => {
        state.isCustomersStatsLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.customersStats = {};
      });
  },
});

export const {reset} = customersSlice.actions;
export default customersSlice.reducer;
