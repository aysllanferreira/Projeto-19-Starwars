import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchPlanets from './services/planetsApi';
import { setFilterMor, setFilterOne } from './redux/reducers/filters';
import './App.css';
import Table from './components/Table';
import TypeFilter from './components/Filters/TypeFilter';
import NumberFilters from './components/Filters/NumberFilters';
import OrderFilters from './components/Filters/OrderFilters';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const { results } = await fetchPlanets();
      dispatch(setFilterMor(results));
      dispatch(setFilterOne(results));
    };
    fetchPlanetsData();
  }, [dispatch]);

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <TypeFilter />
      <NumberFilters />
      <OrderFilters />
      <Table />
    </div>
  );
}

export default App;
