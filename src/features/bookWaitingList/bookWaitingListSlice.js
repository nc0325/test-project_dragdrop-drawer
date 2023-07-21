import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import bookWaitingListService from './bookWaitingListService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const bookWaitingList = createAsyncThunk(
  'bookWaitingList/bookWaitingList',
  async ({id, data}, thunkApi) => {
    try {
      return await bookWaitingListService.bookWaitingList(id, data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const bookWaitingListSlice = createSlice({
  name: 'bookWaitingList',
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
      .addCase(bookWaitingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookWaitingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(bookWaitingList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const {reset} = bookWaitingListSlice.actions;
export default bookWaitingListSlice.reducer;
