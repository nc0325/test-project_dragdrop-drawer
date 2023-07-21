import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import offerProvidersService from './offerProvidersService';

const initialState = {
  offerProviders: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getOfferProviders = createAsyncThunk(
  'offerProviders/getOfferProviders',
  async (_, thunkApi) => {
    try {
      return await offerProvidersService.getOfferProviders();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const offerProviderQuickService = createAsyncThunk(
  'offerProviders/offerProviderQuickService',
  async ({id, data}, thunkApi) => {
    try {
      return await offerProvidersService.offerProviderQuickService(id, data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const offerProvidersSlice = createSlice({
  name: 'offerProviders',
  initialState,
  reducers: {
    reset: (state) => {
      state.offerProviders = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOfferProviders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOfferProviders.fulfilled, (state, action) => {
        state.offerProviders = action.payload.data.map((offerProvider) => ({
          ...offerProvider,
          isLoading: false,
        }));
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getOfferProviders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.offerProviders = null;
      })
      .addCase(offerProviderQuickService.pending, (state, action) => {
        state.offerProviders = state.offerProviders.map((offerProvider) => {
          if (offerProvider.id === action.meta.arg.id) {
            offerProvider.isLoading = true;
          }

          return offerProvider;
        });
      })
      .addCase(offerProviderQuickService.fulfilled, (state, action) => {
        state.offerProviders = state.offerProviders.map((offerProvider) => {
          if (offerProvider.id === action.meta.arg.id) {
            offerProvider.isLoading = false;
            offerProvider.isSuccess = true;
          }

          return offerProvider;
        });
      })
      .addCase(offerProviderQuickService.rejected, (state, action) => {
        state.offerProviders = state.offerProviders.map((offerProvider) => {
          if (offerProvider.id === action.meta.arg.id) {
            offerProvider.isLoading = false;
            offerProvider.isSuccess = false;
          }

          return offerProvider;
        });
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const {reset} = offerProvidersSlice.actions;
export default offerProvidersSlice.reducer;
