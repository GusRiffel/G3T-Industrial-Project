import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Row, Col } from 'react-bootstrap';

const ZoneScreen = ({ currency }) => {
  const [countries, setCountries] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const params = useParams();

  let landline = true;

  if (params.id[0] != 'Z') {
    landline = false;
  }

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countries = await axios.get(`/api/zones/zone/${params.id}`);

        setCountries(countries.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    loadCountries();
  }, []);


  return (
    <>
      <Row>
        <Col>
          <h2>
            {landline
              ? `Landline zone ${params.id}`
              : `Mobile zone ${params.id}`}
          </h2>
        </Col>
        {params.id != 'Z9' && params.id != 'X' && 
        <Col>
          <h6>Residential {currency}</h6>
          {countries && <h4>{currency == 'GBP'
                    ? countries[0].RateResidentialGBP
                    : currency == 'USD'
                    ? countries[0].RateUSD
                    : countries[0].RateEU}{' '}
                  {currency == 'GBP' ? 'pence' : 'cents'}</h4>}
        </Col>}
      </Row>
      <p>*International OFFnet Pricing By Destination /per Minute</p>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Destination</th>
            <th>Tariff</th>
          </tr>
        </thead>
        <tbody>
          {countries &&
            countries.map((country, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{country.Destination}</td>
                <td>
                  {currency == 'GBP'
                    ? country.RateResidentialGBP
                    : currency == 'USD'
                    ? country.RateUSD
                    : country.RateEU}{' '}
                  {currency == 'GBP' ? 'pence' : 'cents'}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default ZoneScreen;
