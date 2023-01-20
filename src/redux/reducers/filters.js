import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterMor: [],
  filterOne: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterMor(state, action) {
      state.filterMor = action.payload;
    },
    setFilterOne(state, action) {
      state.filterOne = action.payload;
    },
  },
});

export const { setFilterMor, setFilterOne } = filtersSlice.actions;

export default filtersSlice.reducer;
