import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import searchProductsForSelectService from './searchProductsForSelectService';

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getProducts = createAsyncThunk(
  'searchProductsForSelect/getProducts',
  async (query, thunkApi) => {
    try {
      return await searchProductsForSelectService.getProducts(query);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const searchProductsForSelectSlice = createSlice({
  name: 'searchProductsForSelect',
  initialState,
  reducers: {
    reset: (state) => {
      state.products = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const products =
          action.payload.data.length > 0
            ? action.payload.data.map((product) => ({
                label: product.name,
                value: product.id,
              }))
            : [];

        state.products = products;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.products = null;
      });
  },
});

export const {reset} = searchProductsForSelectSlice.actions;
export default searchProductsForSelectSlice.reducer;
