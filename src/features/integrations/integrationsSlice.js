import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import integrationsService from './integrationsService';

const initialState = {
  integrations: null,
  foodicsUrl: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingInitiateFoodics: false,
  message: '',
};

export const initiateFoodics = createAsyncThunk(
  'integrations/initiateFoodics',
  async (_, thunkApi) => {
    try {
      return await integrationsService.initiateFoodics();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const successFoodics = createAsyncThunk(
  'integrations/successFoodics',
  async (data, thunkApi) => {
    try {
      return await integrationsService.successFoodics(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getIntegrations = createAsyncThunk(
  'integrations/getIntegrations',
  async (_, thunkApi) => {
    try {
      return await integrationsService.getIntegrations();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const integrationsSlice = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    reset: (state) => {
      state.foodicsUrl = null;
      state.integrations = null;
      state.isLoading = false;
      state.isLoadingInitiateFoodics = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateFoodics.pending, (state) => {
        state.isLoadingInitiateFoodics = true;
      })
      .addCase(initiateFoodics.fulfilled, (state, action) => {
        state.isLoadingInitiateFoodics = false;
        state.foodicsUrl = action.payload.data.url;
      })
      .addCase(initiateFoodics.rejected, (state, action) => {
        state.isLoadingInitiateFoodics = false;
        state.message = action.payload.message;
      })
      .addCase(successFoodics.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(successFoodics.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(successFoodics.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(getIntegrations.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getIntegrations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.integrations = action.payload.data;
      })
      .addCase(getIntegrations.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const {reset} = integrationsSlice.actions;
export default integrationsSlice.reducer;
