import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchPlanets from './services/planetsApi';
import { setFilterMor, setFilterOne } from './redux/reducers/filters';
import './App.css';
import Table from './components/Table';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const data = await fetchPlanets();
      dispatch(setFilterMor(data.results));
      dispatch(setFilterOne(data.results));
    };
    fetchPlanetsData();
  }, [dispatch]);

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <Table />
    </div>
  );
}

export default App;
