import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import accountService from './accountService';

const initialState = {
  account: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingTestFeedbackMessage: false,
  isLoadingTestLoyaltyMessage: false,
  message: '',
};

export const getAccountData = createAsyncThunk(
  'account/getAccountData',
  async (_, thunkApi) => {
    try {
      return await accountService.getAccountData();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getPublicAccountData = createAsyncThunk(
  'account/getPublicAccountData',
  async (id, thunkApi) => {
    try {
      return await accountService.getPublicAccountData(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const updateAccount = createAsyncThunk(
  'account/updateAccount',
  async (data, thunkApi) => {
    try {
      return await accountService.updateAccount(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const testAccountFeedbackMessage = createAsyncThunk(
  'account/testAccountFeedbackMessage',
  async (data, thunkApi) => {
    try {
      return await accountService.testAccountFeedbackMessage(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const testAccountLoyaltyMessage = createAsyncThunk(
  'account/testAccountLoyaltyMessage',
  async (data, thunkApi) => {
    try {
      return await accountService.testAccountLoyaltyMessage(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    reset: (state) => {
      state.account = null;
      state.isLoading = false;
      state.isLoadingTestFeedbackMessage = false;
      state.isLoadingTestLoyaltyMessage = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccountData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccountData.fulfilled, (state, action) => {
        state.account = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getAccountData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.account = null;
      })
      .addCase(getPublicAccountData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicAccountData.fulfilled, (state, action) => {
        state.account = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getPublicAccountData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.account = null;
      })
      .addCase(updateAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.account = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.account = null;
      })
      .addCase(testAccountFeedbackMessage.pending, (state) => {
        state.isLoadingTestFeedbackMessage = true;
      })
      .addCase(testAccountFeedbackMessage.fulfilled, (state) => {
        state.isLoadingTestFeedbackMessage = false;
      })
      .addCase(testAccountFeedbackMessage.rejected, (state) => {
        state.isLoadingTestFeedbackMessage = false;
      })
      .addCase(testAccountLoyaltyMessage.pending, (state) => {
        state.isLoadingTestLoyaltyMessage = true;
      })
      .addCase(testAccountLoyaltyMessage.fulfilled, (state) => {
        state.isLoadingTestLoyaltyMessage = false;
      })
      .addCase(testAccountLoyaltyMessage.rejected, (state) => {
        state.isLoadingTestLoyaltyMessage = false;
      });
  },
});

export const {reset} = accountSlice.actions;
export default accountSlice.reducer;
