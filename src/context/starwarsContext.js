import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import fetchAPI from '../data';

export default function StarwarsContext({ children }) {
  const [starWars, setStarWars] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  useEffect(() => {
    const getAPI = async () => {
      const data = await fetchAPI();
      setStarWars(data.results);
    };
    getAPI();
  }, []);

  const filterPlanetName = starWars
    .filter((planet) => planet.name.includes(filterByName.name));

  return (
    <Context.Provider
      value={ {
        starWars,
        filterByName,
        filterPlanetName,
        setFilterByName,
      } }
    >
      { children }
    </Context.Provider>
  );
}

StarwarsContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
