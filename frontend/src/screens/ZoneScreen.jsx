import React from 'react'
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const ZoneScreen = () => {

  const [countries, setCountries] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const params = useParams();

  let landline = true;

  if( params.id.toUpperCase() != params.id.toLowerCase() ) {
    landline = false;
  }

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countries = await axios.get(`/api/zones/${params.id}`);

        setCountries(countries.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    loadCountries();
  }, []);
   console.log(countries)

  return (
    <>
    <h2>{landline ? `Landline zone ${params.id}` : `Mobile zone ${params.id}`}</h2>
    <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>No</th>
              <th>Destination</th>
              <th>Tariff</th>
            </tr>
          </thead>
          <tbody>
            {countries && countries.map((country, i) => (
              <tr key={country.id}>
                <td>{i + 1}</td>
                <td>{country.country}</td>
                <td>{landline ? country.land_tariff : country.mobile_tariff}</td>
              </tr>
            ))}
          </tbody>
        </Table>
    </>
  )
}

export default ZoneScreen