import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import checkCodeService from './checkCodeService';

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const checkCode = createAsyncThunk(
  'home/checkCode',
  async (data, thunkApi) => {
    try {
      return await checkCodeService.checkCode(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const checkCodeSlice = createSlice({
  name: 'checkCode',
  initialState,
  reducers: {
    reset: (state) => {
      state.data = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkCode.pending, (state) => {
        state.isLoading = true;
        state.data = null;
      })
      .addCase(checkCode.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(checkCode.rejected, (state, action) => {
        state.data = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const {reset} = checkCodeSlice.actions;
export default checkCodeSlice.reducer;
