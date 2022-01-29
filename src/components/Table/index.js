import React, { useContext, useEffect, useState } from 'react';
import { Table as TableBox } from 'react-bootstrap';
import Context from '../../context/context';
import './style.css';

export default function Table() {
  const { starWars, filterByName,
    filterStarWars, filterOrder, order } = useContext(Context);
  const [filterPlanetName, setFilterPlanetName] = useState([]);

  useEffect(() => {
    const filterPlanets = () => {
      if (filterOrder.length !== 0) {
        return setFilterPlanetName(filterOrder);
      } if (filterByName.name !== '') {
        return setFilterPlanetName(starWars
          .filter((planet) => planet.name.includes(filterByName.name)));
      } if (filterStarWars.length !== 0) {
        return setFilterPlanetName(filterStarWars);
      }
      return setFilterPlanetName(starWars.sort((planetA, planetB) => (
        +(planetA.name > planetB.name) || +(planetA.name > planetB.name) - 1)));
    };
    filterPlanets();
  }, [filterByName, filterByName.name, filterOrder,
    filterStarWars, starWars, order]);

  return (
    <TableBox striped bordered hover variant="dark">
      <thead>
        <tr>
          { starWars.length !== 0
            ? Object.keys(starWars[0])
              .filter((planet) => planet !== 'residents').map((planet, index) => (
                <th
                  key={ index }
                  className="text-capitalize"
                >
                  { planet.split('_').join(' ') }
                </th>
              )) : <th>Loading...</th> }
        </tr>
      </thead>
      <tbody>
        { starWars.length !== 0 ? filterPlanetName.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        )) : <tr><td>Loading...</td></tr> }
      </tbody>
    </TableBox>
  );
}
