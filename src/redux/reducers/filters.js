import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterMor: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterMor(state, action) {
      state.filterMor = action.payload;
    },
  },
});

export const { setFilterMor } = filtersSlice.actions;

export default filtersSlice.reducer;
