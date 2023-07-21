import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import loyaltyService from './loyaltyService';

const initialState = {
  loyalty: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getLoyalty = createAsyncThunk(
  'loyalty/getLoyalty',
  async (_, thunkApi) => {
    try {
      return await loyaltyService.getLoyalty();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState,
  reducers: {
    reset: (state) => {
      state.loyalty = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoyalty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoyalty.fulfilled, (state, action) => {
        state.loyalty = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getLoyalty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.loyalty = {};
      });
  },
});

export const {reset} = loyaltySlice.actions;
export default loyaltySlice.reducer;
