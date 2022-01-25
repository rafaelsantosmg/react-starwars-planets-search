import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import fetchAPI from '../data';

export default function StarwarsContext({ children }) {
  const [starWars, setStarWars] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const data = await fetchAPI();
      setStarWars(data.results);
    };
    getAPI();
  }, []);

  return (
    <Context.Provider value={ { starWars } }>
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
