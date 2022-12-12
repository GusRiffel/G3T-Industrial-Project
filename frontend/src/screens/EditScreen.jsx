import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useParams} from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { UserContext } from '../context/AuthContext';

const EditScreen = () => {

  const { currentToken } = useContext(UserContext);
  const params = useParams();


  const [key, setKey] = useState('');
  const [destination, setDestination] = useState('');
  //const [MAGCode, setMAGCode] = useState('');
  const [MAGDestination, setMAGDestination] = useState('');
  const [zone, setZone] = useState('');
  const [RateBusinessGBP, setRateBusinessGBP] = useState('');
  const [RateResidentialGBP, setRateResidentialGBP] = useState('');
  const [RateEU, setRateEU] = useState('');
  const [RateUSD, setRateUSD] = useState('');
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [success, setSuccess] = useState(false);


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
      MAGCode: key,
      MAGDestination: MAGDestination,
      Destination: destination,
      Key: key,
      Zone: zone,
      RateBusinessGBP: RateBusinessGBP,
      RateResidentialGBP: RateResidentialGBP,
      RateEU: RateEU,
      RateUSD: RateUSD,
    };
    axios.put(`http://localhost:3000/api/zones/update/${params.id}`, data, config).then((res) => {
      res.status == '200' ? setSuccess(true) : null; 
      window.scrollTo(0,0);
    }).catch((err) => {
      setError(err);
      window.scrollTo(0,0);
    });
  };

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const record = await axios.get(`/api/zones/id/${params.id}`);

        setKey(record.data.Key)
        setDestination(record.data.Destination)
        //setMAGCode(record.data.MAGCode)
        setMAGDestination(record.data.MAGDestination)
        setZone(record.data.Zone)
        setRateBusinessGBP(record.data.RateBusinessGBP)
        setRateResidentialGBP(record.data.RateResidentialGBP)
        setRateEU(record.data.RateEU)
        setRateUSD(record.data.RateUSD)
        
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    loadRecord();
  }, []);

  return (
    <FormContainer>
      <h1>Edit field</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant="success">{'Record edited successfully'}</Message>}
      {!loaded && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="keyMAGCode" className="m-3">
          <Form.Label>Key & MAGCode</Form.Label>
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

        {/* <Form.Group controlId="MAGCode" className="m-3">
          <Form.Label>MAGCode</Form.Label>
          <Form.Control
            type="MAGCode"
            placeholder="Enter MAGCode"
            value={MAGCode}
            onChange={(e) => setMAGCode(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

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

        <Button type='submit' variant='primary' className='m-3'>
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}

export default EditScreen