import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Table() {
  const [filter, setFilter] = useState([]);
  const { filterOne } = useSelector((state) => state.filters);

  const thead = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL'];

  useEffect(() => {
    setFilter(filterOne);
  }, [filterOne]);

  return (
    <table>
      <thead>
        <tr>
          {thead.map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>

      <tbody>
        {filter.map((item) => (
          <tr key={ item.name }>
            <td data-testid="planet-name">{item.name}</td>
            <td>{item.rotation_period}</td>
            <td>{item.orbital_period}</td>
            <td>{item.diameter}</td>
            <td>{item.climate}</td>
            <td>{item.gravity}</td>
            <td>{item.terrain}</td>
            <td>{item.surface_water}</td>
            <td>{item.population}</td>
            <td>{item.films}</td>
            <td>{item.created}</td>
            <td>{item.edited}</td>
            <td>{item.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
