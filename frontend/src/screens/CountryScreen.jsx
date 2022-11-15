import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Row, Col } from 'react-bootstrap';

const CountryScreen = () => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const params = useParams();

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const country = await axios.get(`/api/zones/country/${params.id}`);

        setCountry(country.data[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    loadCountries();
  }, []);
  country && console.log(country);

  return (
    <>
      <h2>{params.id}</h2>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Land zone</th>
            <th>Land tariff</th>
            <th>Mobile zone</th>
            <th>Mobile tariff</th>
          </tr>
        </thead>
        <tbody>
              <tr>
                <td>{country && country.land_zone}</td>
                <td>{country && country.land_tariff}</td>
                <td>{country && country.mobile_zone}</td>
                <td>{country && country.mobile_tariff}</td>
              </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CountryScreen;
