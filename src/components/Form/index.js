import React, { useContext, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Context from '../../context/context';
import { selectFirstOptions, selectSecondOptions } from '../../services';

export default function FormBox() {
  const { filterByName: { name },
    setFilterByName,
    setFilterByNumericValues,
    setIndex,
  } = useContext(Context);

  const [addFilter, setAddFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const [filterOption, setFilterOption] = useState(selectFirstOptions);

  const handleInputName = ({ target }) => {
    setFilterByName({
      [target.name]: target.value,
    });
  };

  const handleChangeSelectAndNumber = ({ target }) => {
    setAddFilter(
      { ...addFilter, [target.name]: target.value },
    );
  };

  const handleClick = (event) => {
    event.preventDefault();
    setFilterByNumericValues((prev) => ([...prev, addFilter]));
    setIndex((index) => index + 1);
    setFilterOption(filterOption.filter((option) => option !== addFilter.column));
  };

  const { value } = addFilter;
  return (
    <Form onSubmit={ handleClick }>
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
            type="submit"
            data-testid="button-filter"
            variant="primary"
          >
            Filtrar
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs lg="1" />
        <Col>
          <Form.Label htmlFor="order-option">Ordenar</Form.Label>
          <Form.Select id="order-option" aria-label="Default select example">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="custom-switch"> </Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Ascendente"
          />
        </Col>
        <Col>
          <Form.Label htmlFor="custom-switch"> </Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Descendente"
          />
        </Col>
        <Col xs lg="2" />
      </Row>
    </Form>
  );
}
