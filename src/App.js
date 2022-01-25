import React from 'react';
import StarwarsContext from './context/starwarsContext';
import Table from './components/Table';
import './App.css';
import Header from './components/Header/index.';

function App() {
  return (
    <StarwarsContext>
      <Header />
      <Table />
    </StarwarsContext>
  );
}

export default App;
