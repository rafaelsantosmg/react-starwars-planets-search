import React from 'react';
import StarwarsContext from './context/starwarsContext';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <StarwarsContext>
      <Table />
    </StarwarsContext>
  );
}

export default App;
