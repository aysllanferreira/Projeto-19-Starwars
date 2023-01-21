import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import {renderWithRedux} from './utils/reduxRender';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe ('Testando o componente App', () => {
  test('Teste se a página contém um heading h1 com o texto `Star Wars Planets`', () => {
    renderWithRedux(<App />);
    const heading = screen.getByRole('heading', { name: /star wars planets/i });
    expect(heading).toBeInTheDocument();
  });

  test('Filtre um item usando o data-testid="name-filter"', async () => {
    renderWithRedux(<App />);
    const input = screen.getByTestId('name-filter');
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'tat');
    await waitFor(() => {
      const planet = screen.getByText(/tatooine/i);
      expect(planet).toBeInTheDocument();
    }
    );
  });

  test('Testa se no componente APP, acontece um fetch', async () => {
    renderWithRedux(<App />);
    const planet = await screen.findByText(/tatooine/i);
    expect(planet).toBeInTheDocument();
  });

  test ('Testa se o filtro de coluna funciona', async () => {
    renderWithRedux(<App />);
    const input = screen.getByTestId('column-filter');
    expect(input).toBeInTheDocument();
    userEvent.selectOptions(input, 'population');
    await waitFor(() => {
      const planet = screen.getByText(/tatooine/i);
      expect(planet).toBeInTheDocument();
    });
  });

  test ('Testa os filtros de ordenar por ordem crescente e decrescente', async () => {
    renderWithRedux(<App />);
    const input = screen.getByTestId('column-filter');
    userEvent.selectOptions(input, 'diameter');
    const getAsc = screen.getByTestId('column-sort-input-asc');
    userEvent.click(getAsc);
    const getBtn = screen.getByTestId('column-sort-button');
    userEvent.click(getBtn);
    await waitFor(() => {
      const planet = screen.getByText(/tatooine/i);
      expect(planet).toBeInTheDocument();
    });

    const getDesc = screen.getByTestId('column-sort-input-desc');
    userEvent.click(getDesc);
    userEvent.click(getBtn);
    await waitFor(() => {
      const planet = screen.getByText(/tatooine/i);
      expect(planet).toBeInTheDocument();
    });
  });

  test ('Testa se o filtro de número funciona', async () => {
    renderWithRedux(<App />);
    await waitFor(() => {
      const planet = screen.getByText(/tatooine/i);
      expect(planet).toBeInTheDocument();
    });
    const getColumnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter, 'diameter');
    const getComparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter, 'maior que');
    const getValueFilter = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter, '10000');
    const getBtn = screen.getByTestId('button-filter');


    userEvent.click(getBtn);

  });
});
