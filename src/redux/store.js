import { configureStore } from '@reduxjs/toolkit';
import filters from './reducers/filters';

const store = configureStore({
  reducer: {
    filters,
  },
});

export default store;
