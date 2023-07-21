import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import bookReservationService from './bookReservationService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const bookReservation = createAsyncThunk(
  'bookReservation/bookReservation',
  async ({id, data}, thunkApi) => {
    try {
      return await bookReservationService.bookReservation(id, data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const bookReservationSlice = createSlice({
  name: 'bookReservation',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(bookReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const {reset} = bookReservationSlice.actions;
export default bookReservationSlice.reducer;
