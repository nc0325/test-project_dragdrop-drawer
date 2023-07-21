import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import homeService from './homeService';

const initialState = {
  account: null,
  loyalty: null,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoyaltyLoading: false,
  message: '',
};

export const getDashboardData = createAsyncThunk(
  'home/getDashboardData',
  async (_, thunkApi) => {
    try {
      return await homeService.getDashboardData();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const updateLoyalty = createAsyncThunk(
  'home/updateLoyalty',
  async ({id, data}, thunkApi) => {
    try {
      return await homeService.updateLoyalty(id, data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    reset: (state) => {
      state.account = null;
      state.loyalty = null;
      state.user = null;
      state.isLoading = false;
      state.isLoyaltyLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loyalty = action.payload.data.account.loyalty;

        const account = action.payload.data.account;
        delete account.loyalty;
        state.account = account;

        const user = action.payload.data;
        delete user.account;
        state.user = user;

        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.account = null;
        state.loyalty = null;
        state.user = null;
      })
      .addCase(updateLoyalty.pending, (state) => {
        state.isLoyaltyLoading = true;
      })
      .addCase(updateLoyalty.fulfilled, (state, action) => {
        state.isLoyaltyLoading = false;
        state.isSuccess = true;
        state.loyalty = action.payload.data;
      })
      .addCase(updateLoyalty.rejected, (state, action) => {
        state.isLoyaltyLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const {reset} = homeSlice.actions;
export default homeSlice.reducer;
