import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import fetchAPI from '../data';

export default function StarwarsContext({ children }) {
  const [starWars, setStarWars] = useState([]);
  const [filterStarWars, setFilterStarWars] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const getAPI = async () => {
      const data = await fetchAPI();
      setStarWars(data.results);
    };
    getAPI();
  }, []);

  useEffect(() => {
    const switchFilter = () => {
      const { column, comparison, value } = filterByNumericValues.length > 0
        && filterByNumericValues[index - 1];
      switch (comparison) {
      case 'maior que':
        return setFilterStarWars(starWars.filter((planets) => Number(planets[column])
          > Number((value))));
      case 'menor que':
        return setFilterStarWars(starWars.filter((planets) => Number(planets[column])
          < Number((value))));
      case 'igual a':
        return setFilterStarWars(starWars.filter((planets) => Number(planets[column])
          === Number((value))));
      default:
        return setFilterStarWars([]);
      }
    };
    switchFilter();
  }, [filterByNumericValues, starWars, index]);

  return (
    <Context.Provider
      value={ {
        starWars,
        filterByName,
        filterByNumericValues,
        filterStarWars,
        index,
        setIndex,
        setFilterByName,
        setFilterByNumericValues,
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
