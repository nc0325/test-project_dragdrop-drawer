import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productsService from './productsService';

const initialState = {
  product: null,
  products: [],
  productsCount: 0,
  isError: false,
  isSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
  isCreateSuccess: false,
  isLoading: false,
  isProductsLoading: false,
  message: '',
};

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (params, thunkApi) => {
    try {
      return await productsService.getProducts(params);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id, thunkApi) => {
    try {
      return await productsService.getProduct(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data, thunkApi) => {
    try {
      return await productsService.updateProduct(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (data, thunkApi) => {
    try {
      return await productsService.createProduct(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, thunkApi) => {
    try {
      return await productsService.deleteProduct(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.product = null;
      state.isError = false;
      state.isSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.isCreateSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    resetProducts: (state) => {
      state.products = [];
      state.productsCount = 0;
      state.isError = false;
      state.isSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.isCreateSuccess = false;
      state.isLoading = false;
      state.isProductsLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.products = action.payload.data;
        state.productsCount = action.payload.meta.total;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.products = null;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.product = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = [action.payload.data, ...state.products];
        state.isCreateSuccess = true;
        state.product = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.product = null;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.product = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.product = null;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.product = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = null;
        state.products = state.products.map((p) =>
          p.id === action.payload.data.id ? action.payload.data : p,
        );
        state.isLoading = false;
        state.isUpdateSuccess = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.product = null;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.product = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = null;
        state.products = state.products.filter(
          (p) => p.id !== action.meta.arg.id,
        );
        state.isLoading = false;
        state.isDeleteSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.product = null;
      });
  },
});

export const {reset, resetProducts} = productsSlice.actions;
export default productsSlice.reducer;
