import React, { useContext, useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Context from '../../context/context';
import { selectFirstOptions, selectSecondOptions } from '../../services';

export default function FormBox() {
  const {
    starWars,
    filterByName: { name },
    filterByNumericValues,
    order,
    setFilterByName,
    setFilterByNumericValues,
    setIndex,
    setOrder,
    setFilterOrder,
  } = useContext(Context);

  const [filterOption, setFilterOption] = useState(selectFirstOptions);

  const [addFilter, setAddFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  useEffect(() => {
    const getOptions = () => {
      setFilterOption(filterOption);
    };
    getOptions();
  }, [filterOption]);

  useEffect(() => {
    setAddFilter({
      column: filterOption[0],
      comparison: 'maior que',
      value: '0',
    });
  }, [filterOption]);

  const handleInputName = ({ target }) => {
    setFilterByName({
      [target.name]: target.value,
    });
  };

  const handleChangeSelectAndNumber = ({ target }) => {
    setAddFilter({
      ...addFilter,
      [target.name]: target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    setFilterByNumericValues((prev) => ([...prev, addFilter]));
    setIndex((index) => index + 1);
    setFilterOption(filterOption.filter((option) => option !== addFilter.column));
  };

  const handleDeleteClick = ({ target }) => {
    const position = selectFirstOptions.indexOf(target.name);
    const filterRemove = filterByNumericValues
      .filter((filterByNumeric) => filterByNumeric.column !== target.name);
    setIndex((index) => index - 1);
    setFilterByNumericValues(filterRemove);
    filterOption.splice(position, 0, target.name);
    setFilterOption(filterOption);
  };

  const handleChangeOrder = ({ target }) => {
    setOrder({
      ...order,
      [target.name]: target.value,
    });
  };

  const handleClickOrder = () => {
    if (order.sort === 'ASC') {
      setFilterOrder(starWars.sort((planetA, planetB) => (
        Number(planetA[order.column]) - Number(planetB[order.column]))));
    } if (order.sort === 'DESC') {
      setFilterOrder(starWars.sort((planetA, planetB) => (
        Number(planetB[order.column]) - Number(planetA[order.column]))));
    }
  };

  const { value } = addFilter;
  return (
    <Form>
      <Row className="align-items-center mb-3">
        <Col />
        <Col xs lg="4">
          <Form.Control
            data-testid="name-filter"
            type="text"
            name="name"
            placeholder="Filtrar por nome"
            value={ name }
            onChange={ handleInputName }
          />
        </Col>
        <Col />
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs lg="1" />
        <Col>
          <Form.Select
            data-testid="column-filter"
            aria-label="Default select example"
            name="column"
            onChange={ handleChangeSelectAndNumber }
          >
            { filterOption.map((option) => (
              <option key={ option } value={ option }>{ option }</option>
            )) }
          </Form.Select>
        </Col>
        <Col>
          <Form.Select
            data-testid="comparison-filter"
            aria-label="Default select example"
            name="comparison"
            onChange={ handleChangeSelectAndNumber }
          >
            { selectSecondOptions.map((option) => (
              <option key={ option } value={ option }>{ option }</option>
            )) }
          </Form.Select>
        </Col>
        <Col>
          <Form.Control
            data-testid="value-filter"
            type="number"
            name="value"
            value={ value }
            onChange={ handleChangeSelectAndNumber }
          />
        </Col>
        <Col xs lg="2">
          <Button
            type="button"
            data-testid="button-filter"
            variant="primary"
            onClick={ handleClick }
            disabled={ filterOption.length === 0 }
          >
            Filtrar
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs lg="3" />
        <Col>
          <Form.Label htmlFor="order-option">Ordenar</Form.Label>
          <Form.Select
            data-testid="column-sort"
            id="order-option"
            aria-label="Default select example"
            name="column"
            onChange={ handleChangeOrder }
          >
            { selectFirstOptions.map((option) => (
              <option key={ option } value={ option }>{ option }</option>
            )) }
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="custom-asc"> </Form.Label>
          <Form.Check
            data-testid="column-sort-input-asc"
            type="radio"
            id="custom-asc"
            name="sort"
            value="ASC"
            label="Ascendente"
            onChange={ handleChangeOrder }
          />
        </Col>
        <Col>
          <Form.Label htmlFor="custom-desc"> </Form.Label>
          <Form.Check
            data-testid="column-sort-input-desc"
            type="radio"
            id="custom-desc"
            name="sort"
            value="DESC"
            label="Descendente"
            onChange={ handleChangeOrder }
          />
        </Col>
        <Col>
          <Button
            type="button"
            data-testid="column-sort-button"
            name="orderButton"
            onClick={ handleClickOrder }
          >
            Ordenar
          </Button>
        </Col>
        <Col xs lg="3" />
      </Row>
      <Row>
        <Col>
          { filterByNumericValues.length !== 0 && filterByNumericValues
            .map((values, index) => (
              <div data-testid="filter" key={ index }>
                <span>
                  { values.column }
                  { ' ' }
                </span>
                <span>
                  { values.comparison }
                  { ' ' }
                </span>
                <span>
                  { values.value }
                  { ' ' }
                </span>
                <Button
                  type="button"
                  name={ values.column }
                  onClick={ handleDeleteClick }
                >
                  X
                </Button>
              </div>
            )) }
        </Col>
      </Row>
    </Form>
  );
}
