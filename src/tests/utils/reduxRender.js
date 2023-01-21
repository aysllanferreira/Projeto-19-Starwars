import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filters from '../../redux/reducers/filters';

export const renderWithRedux = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: {
        filters,
      },
    }),
    ...renderOptions
  } = {},
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};