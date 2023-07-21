import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import notificationsService from './notificationsService';

const initialState = {
  notifications: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  hasMore: false,
  page: '',
  message: '',
};

export const getNotifications = createAsyncThunk(
  'info/getNotifications',
  async (page, thunkApi) => {
    try {
      return await notificationsService.getNotifications(page);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    reset: (state) => {
      state.notifications = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.hasMore = false;
      state.page = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        let page;
        if (action.payload.links.next) {
          const nextPageUrl = new URL(action.payload.links.next);
          const nextPageParams = new URLSearchParams(nextPageUrl.search);
          page = nextPageParams.get('page');
        }

        state.page = page;
        state.notifications = [...state.notifications, ...action.payload.data];
        state.hasMore = page ? true : false;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.message = action.payload.message;
        state.notifications = [];
        state.isLoading = false;
        state.isError = true;
        state.hasMore = false;
        state.page = '';
      });
  },
});

export const {reset} = notificationsSlice.actions;
export default notificationsSlice.reducer;
