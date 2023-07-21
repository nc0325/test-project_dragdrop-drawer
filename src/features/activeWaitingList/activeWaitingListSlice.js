import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import activeWaitingListService from './activeWaitingListService';

const initialState = {
  waitingList: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getActiveWaitingList = createAsyncThunk(
  'activeWaitingList/getActiveWaitingList',
  async (_, thunkApi) => {
    try {
      return await activeWaitingListService.getActiveWaitingList();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const updateActiveWaitingList = createAsyncThunk(
  'activeWaitingList/updateActiveWaitingList',
  async (id, thunkApi) => {
    try {
      return await activeWaitingListService.updateActiveWaitingList(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const deleteActiveWaitingList = createAsyncThunk(
  'activeWaitingList/deleteActiveWaitingList',
  async (id, thunkApi) => {
    try {
      return await activeWaitingListService.deleteActiveWaitingList(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const waitingListSlice = createSlice({
  name: 'activeWaitingList',
  initialState,
  reducers: {
    reset: (state) => {
      state.waitingList = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveWaitingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveWaitingList.fulfilled, (state, action) => {
        state.waitingList = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getActiveWaitingList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.waitingList = null;
      })
      .addCase(updateActiveWaitingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateActiveWaitingList.fulfilled, (state, action) => {
        state.waitingList = state.waitingList.filter(
          (w) => w.id !== action.payload.data.id,
        );
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateActiveWaitingList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(deleteActiveWaitingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteActiveWaitingList.fulfilled, (state, action) => {
        state.waitingList = state.waitingList.filter(
          (w) => w.id !== action.payload.data.id,
        );
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteActiveWaitingList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const {reset} = waitingListSlice.actions;
export default waitingListSlice.reducer;
