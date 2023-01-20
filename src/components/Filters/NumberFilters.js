import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterOne } from '../../redux/reducers/filters';

const selectData = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

const selectComparison = ['maior que', 'menor que', 'igual a'];

function NumberFilters() {
  const dispatch = useDispatch();
  const { filterOne } = useSelector((state) => state.filters);
  const [previousFilter, setPreviousFilter] = useState([]);
  const [selectGreaterThan, setSelectGreaterThan] = useState('maior que');
  const [columnFilter, setColumnFilter] = useState('population');
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    if (previousFilter.length === 0) {
      setPreviousFilter(filterOne);
    }
  }, [previousFilter.length, filterOne]);

  const handleFilters = (event) => {
    event.preventDefault();
    const column = columnFilter;
    const comparison = selectGreaterThan;
    const value = +inputValue;

    console.log(column, comparison, value);

    // Handle Population unknown
    if (column === 'population' && comparison === 'maior que' && +value === 0) {
      dispatch(setFilterOne(previousFilter.filter((item) => item[column] !== 'unknown')));
      return;
    }

    switch (comparison) {
    case 'maior que':
      dispatch(setFilterOne(previousFilter.filter((item) => +item[column] > +value)));
      break;
    case 'menor que':
      dispatch(setFilterOne(previousFilter.filter((item) => +item[column] < +value)));
      break;
    case 'igual a':
      dispatch(setFilterOne(previousFilter.filter((item) => +item[column] === +value)));
      break;
    default:
      break;
    }
  };

  return (
    <form onSubmit={ handleFilters }>
      <select
        data-testid="column-filter"
        onChange={ (e) => { setColumnFilter(e.target.value); } }
        value={ columnFilter }
      >
        {selectData.map((item) => <option key={ item }>{item}</option>)}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ (e) => { setSelectGreaterThan(e.target.value); } }
        value={ selectGreaterThan }
      >
        {selectComparison.map((item) => <option key={ item }>{item}</option>)}
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) }
      />

      <button
        data-testid="button-filter"
        type="submit"
      >
        Filtrar
      </button>
    </form>
  );
}

export default NumberFilters;
