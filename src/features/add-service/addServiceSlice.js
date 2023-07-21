import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import addServiceService from './addServiceService';

const initialState = {
  customer: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const addService = createAsyncThunk(
  'services/addService',
  async (data, thunkApi) => {
    try {
      return await addServiceService.addService(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const addServiceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    reset: (state) => {
      state.customer = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addService.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.customer = {};
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.customer = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(addService.rejected, (state, action) => {
        state.customer = {};
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const {reset} = addServiceSlice.actions;
export default addServiceSlice.reducer;
