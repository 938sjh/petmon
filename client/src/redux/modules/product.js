import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

const productSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = productSlice.actions;

export default productSlice.reducer;