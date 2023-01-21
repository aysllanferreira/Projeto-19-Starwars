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

  test('Filtre um item usando o data-testid="name-filter"', () => {
    renderWithRedux(<App />);

    const input = screen.getByTestId('name-filter');
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'tat');
    
  });

  test ('Testa se o filtro de coluna funciona',  () => {
    renderWithRedux(<App />);
    const input = screen.getByTestId('column-filter');
    expect(input).toBeInTheDocument();
    userEvent.selectOptions(input, 'population');
    // get button to click on 
    const getBtn = screen.getByTestId('button-filter');
    userEvent.click(getBtn);
    

  });

  test ('Testa os filtros de ordenar por ordem crescente e decrescente', () => {
    renderWithRedux(<App />);
  
    const input = screen.getByTestId('column-filter');
    userEvent.selectOptions(input, 'diameter');
    const getAsc = screen.getByTestId('column-sort-input-asc');
    userEvent.click(getAsc);
    const getBtn = screen.getByTestId('column-sort-button');
    userEvent.click(getBtn);
    
    const getDesc = screen.getByTestId('column-sort-input-desc');
    userEvent.click(getDesc);
    userEvent.click(getBtn);

    expect(getAsc).toBeInTheDocument();
    expect(getDesc).toBeInTheDocument();
    expect(getBtn).toBeInTheDocument();
  });

  test ('Testa se o filtro de número funciona', async () => {
    renderWithRedux(<App />);

    await waitFor(() => { 
      const planet = screen.getByText(/Tatooine/i);
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

  test ('Testa os multiplos filtros', async () => {
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

    const getColumnFilter2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter2, 'population');
    const getComparisonFilter2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter2, 'menor que');
    const getValueFilter2 = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter2, '100000');
    const getBtn2 = screen.getByTestId('button-filter');
    userEvent.click(getBtn2);

    // remove one 
    const getRemoveBtn = screen.getAllByTestId('filter');
    userEvent.click(getRemoveBtn[0]);

    // remove all
    const getRemoveAllBtn = screen.getByTestId('button-remove-filters');
    userEvent.click(getRemoveAllBtn);
  });

  test ('Testa as opcoes maior que e igual a', async () => {
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

    const getColumnFilter2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter2, 'population');
    const getComparisonFilter2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter2, 'igual a');
    const getValueFilter2 = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter2, '200000');
    const getBtn2 = screen.getByTestId('button-filter');
    userEvent.click(getBtn2);
  });

  test ('Testa a opcao maior que', async () => {
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

    const getColumnFilter2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter2, 'population');
    const getComparisonFilter2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter2, 'maior que');
    const getValueFilter2 = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter2, '200000');
    const getBtn2 = screen.getByTestId('button-filter');
    userEvent.click(getBtn2);

  });

  test ('Testa o store do redux com o provider', async () => {
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

    const getColumnFilter2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter2, 'population');
    const getComparisonFilter2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter2, 'maior que');
    const getValueFilter2 = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter2, '200000');
    const getBtn2 = screen.getByTestId('button-filter');
    userEvent.click(getBtn2);

    const getRemoveAllBtn = screen.getByTestId('button-remove-filters');
    userEvent.click(getRemoveAllBtn);
  });

  test ('Testa 100% branch de OrderFilters.js', async () => {
    renderWithRedux(<App />);

    await waitFor(() => {
      const planet = screen.getByText(/tatooine/i);
      expect(planet).toBeInTheDocument();
    });
    
    const getColumnFilter = screen.getByTestId('column-sort');
    userEvent.selectOptions(getColumnFilter, 'diameter');
    const getAscOpt = screen.getByTestId('column-sort-input-asc');
    userEvent.click(getAscOpt);
    const getBtn = screen.getByTestId('column-sort-button');
    userEvent.click(getBtn); 
    expect(getAscOpt.value).toBe('ASC');

    const getDescOpt = screen.getByTestId('column-sort-input-desc');
    userEvent.click(getDescOpt);
    const getOtherFilter = screen.getByTestId('column-sort');
    userEvent.selectOptions(getOtherFilter, 'population');
    const getBtn2 = screen.getByTestId('column-sort-button');
    userEvent.click(getBtn2);
    expect(getDescOpt.value).toBe('DESC');
  });

  test ('Testa 100% branch de NumericFilters.js', async () => {
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

    const getColumnFilter2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter2, 'population');
    const getComparisonFilter2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter2, 'maior que');
    const getValueFilter2 = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter2, '200000');
    const getBtn2 = screen.getByTestId('button-filter');
    userEvent.click(getBtn2);

    const getRemoveAllBtn = screen.getByTestId('button-remove-filters');
    userEvent.click(getRemoveAllBtn);
  });

  test ('Testa os remove filters', async () => {
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

    // remove this diamater filter only using the div with data-testid="filter"
    const getRemoveFilter = screen.getByTestId('filter');
    userEvent.click(getRemoveFilter);
  });

  test ('Testa o botão de remover apenas um filtro', async () => {
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

    const getColumnFilter2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter2, 'population');
    const getComparisonFilter2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter2, 'maior que');
    const getValueFilter2 = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter2, '200000');
    const getBtn2 = screen.getByTestId('button-filter');
    userEvent.click(getBtn2);

    const getRemoveFilter = screen.getAllByTestId('filter');
    userEvent.click(getRemoveFilter[0]);
  });

  test ('Cover default of switch case from NumberFilters.js', async () => {
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

    const getColumnFilter2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter2, 'population');
    const getComparisonFilter2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter2, 'maior que');
    const getValueFilter2 = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter2, '200000');
    const getBtn2 = screen.getByTestId('button-filter');
    userEvent.click(getBtn2);

    const getRemoveFilter = screen.getAllByTestId('filter');
    userEvent.click(getRemoveFilter[1]);
  });

  
  
});
