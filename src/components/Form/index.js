import React, { useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Context from '../../context/context';

export default function FormBox() {
  const { filterByName,
    setFilterByName,
  } = useContext(Context);

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setFilterByName({
      [name]: value,
    });
  };

  const { name } = filterByName;
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
            onChange={ handleInput }
          />
        </Col>
        <Col />
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs lg="1" />
        <Col>
          <Form.Select aria-label="Default select example">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select aria-label="Default select example">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Control type="number" />
        </Col>
        <Col xs lg="2">
          <Button variant="primary">Filtrar</Button>
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
