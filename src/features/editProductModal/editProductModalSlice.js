import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  productId: '',
};

export const editProductModalSlice = createSlice({
  name: 'editProductModal',
  initialState,
  reducers: {
    showEditProductModal: (state, action) => {
      state.isVisible = true;
      state.productId = action.payload;
    },
    hideEditProductModal: (state) => {
      state.isVisible = false;
      state.productId = '';
    },
  },
});

export const {showEditProductModal, hideEditProductModal} =
  editProductModalSlice.actions;
export default editProductModalSlice.reducer;
