import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import activeReservationsService from './activeReservationsService';

const initialState = {
  activeReservations: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getActiveReservations = createAsyncThunk(
  'activeReservations/getActiveReservations',
  async (_, thunkApi) => {
    try {
      return await activeReservationsService.getActiveReservations();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const confirmActiveReservations = createAsyncThunk(
  'activeReservations/confirmActiveReservations',
  async (id, thunkApi) => {
    try {
      return await activeReservationsService.confirmActiveReservations(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const attendActiveReservations = createAsyncThunk(
  'activeReservations/attendActiveReservations',
  async (id, thunkApi) => {
    try {
      return await activeReservationsService.attendActiveReservations(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const activeReservationsSlice = createSlice({
  name: 'activeReservations',
  initialState,
  reducers: {
    reset: (state) => {
      state.activeReservations = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveReservations.fulfilled, (state, action) => {
        state.activeReservations = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getActiveReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.activeReservations = null;
      })
      .addCase(confirmActiveReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmActiveReservations.fulfilled, (state, action) => {
        state.activeReservations = state.activeReservations.map((res) => {
          if (res.id === action.payload.data.id) {
            return action.payload.data;
          }
          return res;
        });
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(confirmActiveReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.activeReservations = null;
      })
      .addCase(attendActiveReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(attendActiveReservations.fulfilled, (state, action) => {
        state.activeReservations = state.activeReservations.filter(
          (res) => res.id !== action.payload.data.id,
        );
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(attendActiveReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.activeReservations = null;
      });
  },
});

export const {reset} = activeReservationsSlice.actions;
export default activeReservationsSlice.reducer;
