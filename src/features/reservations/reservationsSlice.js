import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import reservationsService from './reservationsService';

const initialState = {
  reservations: null,
  reservationsCount: 0,
  pendingReservations: null,
  pendingReservationsCount: 0,
  isPendingReservationsLoading: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getReservations = createAsyncThunk(
  'reservations/getReservations',
  async (params, thunkApi) => {
    try {
      return await reservationsService.getReservations(params);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getPendingReservations = createAsyncThunk(
  'reservations/getPendingReservations',
  async (params, thunkApi) => {
    try {
      return await reservationsService.getPendingReservations(params);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (data, thunkApi) => {
    try {
      return await reservationsService.createReservation(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const confirmReservation = createAsyncThunk(
  'reservations/confirmReservation',
  async (id, thunkApi) => {
    try {
      return await reservationsService.confirmReservation(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const attendReservation = createAsyncThunk(
  'reservations/attendReservation',
  async (id, thunkApi) => {
    try {
      return await reservationsService.attendReservation(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async (id, thunkApi) => {
    try {
      return await reservationsService.deleteReservation(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    reset: (state) => {
      state.reservations = null;
      state.reservationsCount = 0;
      state.pendingReservations = null;
      state.pendingReservationsCount = 0;
      state.isPendingReservationsLoading = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReservations.fulfilled, (state, action) => {
        state.reservations = action.payload.data;
        state.reservationsCount = action.payload.meta.total;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.reservations = null;
        state.reservationsCount = 0;
      })
      .addCase(getPendingReservations.pending, (state) => {
        state.isPendingReservationsLoading = true;
      })
      .addCase(getPendingReservations.fulfilled, (state, action) => {
        state.pendingReservations = action.payload.data;
        state.pendingReservationsCount = action.payload.meta.total;
        state.isPendingReservationsLoading = false;
        state.isSuccess = true;
      })
      .addCase(getPendingReservations.rejected, (state, action) => {
        state.isPendingReservationsLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.pendingReservationsCount = 0;
        state.pendingReservations = null;
      })
      .addCase(createReservation.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isPendingReservationsLoading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.reservations = [action.payload.data, ...state.reservations];
        state.pendingReservations = [
          action.payload.data,
          ...state.pendingReservations,
        ];
        state.isSuccess = true;
        state.isLoading = false;
        state.isPendingReservationsLoading = false;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
        state.isLoading = false;
        state.isSuccess = false;
        state.isPendingReservationsLoading = false;
      })
      .addCase(confirmReservation.pending, (state) => {
        state.isLoading = true;
        state.isPendingReservationsLoading = true;
      })
      .addCase(confirmReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.map((res) => {
          if (res.id === action.payload.data.id) {
            return action.payload.data;
          }
          return res;
        });
        state.pendingReservations = state.pendingReservations.filter(
          (res) => res.id !== action.payload.data.id,
        );
        state.isSuccess = true;
        state.isLoading = false;
        state.isPendingReservationsLoading = false;
      })
      .addCase(confirmReservation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
        state.isLoading = false;
        state.isPendingReservationsLoading = false;
      })
      .addCase(attendReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(attendReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.map((res) => {
          if (res.id === action.payload.data.id) {
            return action.payload.data;
          }
          return res;
        });
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(attendReservation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter(
          (res) => res.id !== action.payload.data.id,
        );
        state.pendingReservations = state.pendingReservations.filter(
          (res) => res.id !== action.payload.data.id,
        );
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
        state.isLoading = false;
      });
  },
});

export const {reset} = reservationsSlice.actions;
export default reservationsSlice.reducer;
