import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { UserContext } from '../context/AuthContext';

const CreateScreen = () => {
  const { currentToken } = useContext(UserContext);
  const navigate = useNavigate();


  const [key, setKey] = useState('');
  const [destination, setDestination] = useState('');
  const [MAGCode, setMAGCode] = useState('');
  const [MAGDestination, setMAGDestination] = useState('');
  const [zone, setZone] = useState('');
  const [RateBusinessGBP, setRateBusinessGBP] = useState('');
  const [RateResidentialGBP, setRateResidentialGBP] = useState('');
  const [RateEU, setRateEU] = useState('');
  const [RateUSD, setRateUSD] = useState('');
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Authorization': `Bearer ${currentToken}`,
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    };
    const data = {
      MAGCode: MAGCode,
      MAGDestination: MAGDestination,
      Destination: destination,
      Key: key,
      Zone: zone,
      RateBusinessGBP: RateBusinessGBP,
      RateResidentialGBP: RateResidentialGBP,
      RateEU: RateEU,
      RateUSD: RateUSD,
    };
    axios
      .post('http://localhost:3000/api/zones/create', data, config)
      .then((res) => {
      });
    navigate('/admin');
  };

  return (
    <FormContainer>
      <h1>Create record</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loaded && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="key" className="m-3">
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="key"
            placeholder="Enter Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="destination" className="m-3">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="destination"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="MAGCode" className="m-3">
          <Form.Label>MAGCode</Form.Label>
          <Form.Control
            type="MAGCode"
            placeholder="Enter MAGCode"
            value={MAGCode}
            onChange={(e) => setMAGCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="MAGDestination" className="m-3">
          <Form.Label>MAGDestination</Form.Label>
          <Form.Control
            type="MAGDestination"
            placeholder="Enter MAGDestination"
            value={MAGDestination}
            onChange={(e) => setMAGDestination(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="zone" className="m-3">
          <Form.Label>Zone</Form.Label>
          <Form.Control
            type="zone"
            placeholder="Enter zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="RateBusinessGBP" className="m-3">
          <Form.Label>RateBusinessGBP</Form.Label>
          <Form.Control
            type="RateBusinessGBP"
            placeholder="Enter RateBusinessGBP"
            value={RateBusinessGBP}
            onChange={(e) => setRateBusinessGBP(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="RateResidentialGBP" className="m-3">
          <Form.Label>RateResidentialGBP</Form.Label>
          <Form.Control
            type="RateResidentialGBP"
            placeholder="Enter RateResidentialGBP"
            value={RateResidentialGBP}
            onChange={(e) => setRateResidentialGBP(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="RateEU" className="m-3">
          <Form.Label>RateEU</Form.Label>
          <Form.Control
            type="RateEU"
            placeholder="Enter RateEU"
            value={RateEU}
            onChange={(e) => setRateEU(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="RateUSD" className="m-3">
          <Form.Label>RateUSD</Form.Label>
          <Form.Control
            type="RateUSD"
            placeholder="Enter RateUSD"
            value={RateUSD}
            onChange={(e) => setRateUSD(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="m-3">
          Create
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateScreen;
