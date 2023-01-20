import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterOne } from '../../redux/reducers/filters';

function TypeFilter() {
  const dispatch = useDispatch();

  const { filterMor } = useSelector((state) => state.filters);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => {
          dispatch(setFilterOne(filterMor.filter((item) => item
            .name.includes(e.target.value))));
        } }
      />
    </div>
  );
}

export default TypeFilter;
