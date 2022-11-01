import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import zones from '../zones';
import Zone from '../components/Zone';
import axios from 'axios';

const Homescreen = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await axios.get('/api/countries');

        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    loadCountries();
  }, []);
  console.log(data)

  return (
    <>
      <h2>Landline zones</h2>
      <Row>
        {zones.map((zone) => (zone.type == 'landline' &&
          (<Col key={zone.id} sm={12} md={6} lg={4} xl={3}>
            <Zone zone={zone} />
          </Col>) 
        ))}
      </Row>
      <h2>Mobile zones</h2>
      <Row>
        {zones.map((zone) => (zone.type == 'mobile' &&
          (<Col key={zone.id} sm={12} md={6} lg={4} xl={3}>
            <Zone zone={zone} />
          </Col>) 
        ))}
      </Row>
    </>
  );
};

export default Homescreen;
