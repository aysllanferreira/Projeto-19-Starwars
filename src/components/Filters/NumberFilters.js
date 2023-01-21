import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterOne } from '../../redux/reducers/filters';

const selectComparison = ['maior que', 'menor que', 'igual a'];

function NumberFilters() {
  const dispatch = useDispatch();
  const { filterOne } = useSelector((state) => state.filters);
  const [previousFilter, setPreviousFilter] = useState([]);
  const [selectGreaterThan, setSelectGreaterThan] = useState('maior que');
  const [columnFilter, setColumnFilter] = useState('population');
  const [inputValue, setInputValue] = useState(0);
  const [newFilters, setNewFilters] = useState([]);
  const [addedFilters, setAddedFilters] = useState([]);
  const [ids, setIds] = useState(0);
  const [selectData, setSelectData] = useState(
    ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'],
  );
  const [removedFilters, setRemovedFilters] = useState([]);

  useEffect(() => {
    if (previousFilter.length === 0) {
      setPreviousFilter(filterOne);
    }
  }, [previousFilter.length, filterOne]);

  const verifyEmptySearch = (column, comparison, value) => {
    if (column === 'population' && comparison === 'maior que' && +value === 0) {
      dispatch(setFilterOne(previousFilter.filter((item) => item[column] !== 'unknown')));
      return true;
    }
    return false;
  };

  const comparisonFilter = (column, comparison, value) => {
    switch (comparison) {
    case 'maior que':
      dispatch(setFilterOne(previousFilter.filter((item) => +item[column] > +value)));
      setAddedFilters([...addedFilters, { column, comparison, value, id: ids + 1 }]);
      setIds(ids + 1);
      break;
    case 'menor que':
      dispatch(setFilterOne(previousFilter.filter((item) => +item[column] < +value)));
      setIds(ids + 1);
      setAddedFilters([...addedFilters, { column, comparison, value, id: ids + 1 }]);
      setIds(ids + 1);
      break;
    case 'igual a':
      dispatch(setFilterOne(previousFilter.filter((item) => +item[column] === +value)));
      setIds(ids + 1);
      setAddedFilters([...addedFilters, { column, comparison, value, id: ids + 1 }]);
      setIds(ids + 1);
      break;
    default:
      break;
    }
  };

  const multipleFilters = (column, comparison, value) => {
    if (newFilters.length > 0) {
      switch (comparison) {
      case 'maior que':
        dispatch(setFilterOne(newFilters.filter((item) => +item[column] > +value)));
        break;
      case 'menor que':
        dispatch(setFilterOne(newFilters.filter((item) => +item[column] < +value)));
        break;
      case 'igual a':
        dispatch(setFilterOne(newFilters.filter((item) => +item[column] === +value)));
        break;
      default:
        break;
      }
    }
  };

  const removeRepeatedFilters = (column) => {
    // Remove repeated words from array selectData
    const repeated = selectData.filter((item) => item !== column);
    setSelectData(repeated);
    setRemovedFilters([...removedFilters, column]);
  };

  const handleFilters = (event) => {
    event.preventDefault();
    const column = columnFilter;
    const comparison = selectGreaterThan;
    const value = +inputValue;

    if (verifyEmptySearch()) return;
    comparisonFilter(column, comparison, value);
    multipleFilters(column, comparison, value);
    removeRepeatedFilters(column);
  };

  useEffect(() => {
    setNewFilters(filterOne);
  }, [filterOne]);

  const removeFilter = ({ target }) => {
    const { id, name } = target;
    const filter = addedFilters.filter((item) => item.id !== +id);
    setAddedFilters(filter);
    setSelectData([...selectData, name]);
  };

  useEffect(() => {
    if (addedFilters.length > 0) {
      const filter = addedFilters.reduce((acc, item) => {
        switch (item.comparison) {
        case 'maior que':
          return acc.filter((planet) => +planet[item.column] > +item.value);
        case 'menor que':
          return acc.filter((planet) => +planet[item.column] < +item.value);
        case 'igual a':
          return acc.filter((planet) => +planet[item.column] === +item.value);
        default:
          return acc;
        }
      }, previousFilter);
      dispatch(setFilterOne(filter));
    } else {
      dispatch(setFilterOne(previousFilter));
    }
  }, [addedFilters, previousFilter, dispatch]);

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
      <br />
      {addedFilters.map((item) => (
        <div key={ item.id }>
          <span>{item.column}</span>
          <span>{item.comparison}</span>
          <span>{item.value}</span>
          <button
            type="button"
            id={ item.id }
            name={ item.column }
            onClick={ removeFilter }
            data-testid="filter"
          >
            X
          </button>
        </div>
      ))}
    </form>
  );
}

export default NumberFilters;
