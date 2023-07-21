import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import weeklyOfferService from './weeklyOfferService';

const initialState = {
  weeklyOffer: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getWeeklyOffer = createAsyncThunk(
  'weeklyOffer/getWeeklyOffer',
  async (_, thunkApi) => {
    try {
      return await weeklyOfferService.getWeeklyOffer();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const updateWeeklyOffer = createAsyncThunk(
  'weeklyOffer/updateWeklyOffer',
  async (data, thunkApi) => {
    try {
      return await weeklyOfferService.updateWeeklyOffer(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const createWeeklyOffer = createAsyncThunk(
  'weeklyOffer/createWeklyOffer',
  async (data, thunkApi) => {
    try {
      return await weeklyOfferService.createWeeklyOffer(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const weeklyOfferSlice = createSlice({
  name: 'weeklyOffer',
  initialState,
  reducers: {
    reset: (state) => {
      state.weeklyOffer = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeeklyOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWeeklyOffer.fulfilled, (state, action) => {
        state.weeklyOffer = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getWeeklyOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.weeklyOffer = null;
      })
      .addCase(updateWeeklyOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWeeklyOffer.fulfilled, (state, action) => {
        state.weeklyOffer = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateWeeklyOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.weeklyOffer = null;
      })
      .addCase(createWeeklyOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWeeklyOffer.fulfilled, (state, action) => {
        state.weeklyOffer = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createWeeklyOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.weeklyOffer = null;
      });
  },
});

export const {reset} = weeklyOfferSlice.actions;
export default weeklyOfferSlice.reducer;
