import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import userInfoService from './userInfoService';

const initialState = {
  user: null,
  account: null,
  unreadNotifications: [],
  unreadNotificationsCount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingNotifications: false,
  message: '',
};

export const getUserInfo = createAsyncThunk(
  'info/getUserInfo',
  async (_, thunkApi) => {
    try {
      return await userInfoService.getUserInfo();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const updateUserInfo = createAsyncThunk(
  'info/updateUserInfo',
  async (data, thunkApi) => {
    try {
      return await userInfoService.updateUserInfo(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const updateUserPassword = createAsyncThunk(
  'info/updateUserPassword',
  async (data, thunkApi) => {
    try {
      return await userInfoService.updateUserPassword(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const updateUserAvatar = createAsyncThunk(
  'info/updateUserAvatar',
  async (data, thunkApi) => {
    try {
      return await userInfoService.updateUserAvatar(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const markUnreadNotificationsAsRead = createAsyncThunk(
  'info/markUnreadNotificationsAsRead',
  async (_, thunkApi) => {
    try {
      return await userInfoService.markUnreadNotificationsAsRead();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const userInfoSlice = createSlice({
  name: 'info',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.isLoadingNotifications = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        const unreadNotifications =
          action.payload.data.account.unread_notifications;

        state.unreadNotifications = unreadNotifications;
        state.unreadNotificationsCount = unreadNotifications.length;

        state.account = action.payload.data.account;

        delete action.payload.data.account;
        delete action.payload.data.unread_notifications;

        state.user = action.payload.data;
        state.isLoading = false;
        state.isLoadingNotifications = false;
        state.isSuccess = true;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
        state.unreadNotifications = [];
        state.unreadNotificationsCount = 0;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(markUnreadNotificationsAsRead.pending, () => {
        // state.isLoading = true;
      })
      .addCase(markUnreadNotificationsAsRead.fulfilled, (state) => {
        state.unreadNotificationsCount = 0;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(markUnreadNotificationsAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export default userInfoSlice.reducer;
