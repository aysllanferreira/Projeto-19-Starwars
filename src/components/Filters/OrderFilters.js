import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterOne } from '../../redux/reducers/filters';

const selectData = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function OrderFilters() {
  const { filterOne } = useSelector((state) => state.filters);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name !== 'order') {
      setOrder({ ...order, column: value });
    } else {
      setOrder({ ...order, sort: value });
    }
  };

  const sortFilter = () => {
    const { column, sort } = order;

    const copyOfArray = [...filterOne];

    copyOfArray.sort((a, b) => {
      if (sort === 'ASC') {
        return a[column] - b[column];
      }
      return b[column] - a[column];
    });

    // put unknow in the end of the array

    const unknown = copyOfArray.filter((item) => item[column] === 'unknown');
    const known = copyOfArray.filter((item) => item[column] !== 'unknown');

    copyOfArray.splice(0, copyOfArray.length, ...known, ...unknown);

    dispatch(setFilterOne(copyOfArray));
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ handleChange }
        value={ order.column }
      >
        {selectData.map((item) => (
          <option key={ item }>{item}</option>
        ))}
      </select>

      <input
        type="radio"
        data-testid="column-sort-input-asc"
        name="order"
        onChange={ handleChange }
        value="ASC"
      />
      <label htmlFor="asc">
        {' '}
        ASC
      </label>
      <input
        type="radio"
        data-testid="column-sort-input-desc"
        name="order"
        onChange={ handleChange }
        value="DESC"
      />
      <label htmlFor="desc">
        {' '}
        DESC
      </label>

      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ sortFilter }

      >
        Ordenar
      </button>

    </div>
  );
}

export default OrderFilters;
