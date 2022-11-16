import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Row, Col } from 'react-bootstrap';

const CountryScreen = ({currency}) => {
  const [countries, setCountries] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const params = useParams();

  // let filteredCountries = [];

  // if(countries){
  //   filteredCountries = countries.filter((country)=>{
  //     return country.Destination.includes('Mobile') == false
  //   })
  // }
  
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countries = await axios.get(`/api/zones/country/${params.id}`);

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
      <h2>{params.id}</h2>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Country</th>
            <th>Zone</th>
            <th>Tariff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{countries && countries[0].Destination}</td>
            <td>{countries && countries[0].Zone}</td>
            <td>{currency == 'GBP'
                    ? countries && countries[0].RateResidentialGBP
                    : currency == 'USD'
                    ? countries && countries[0].RateUSD
                    : countries && countries[0].RateEU}{' '}
                  {currency == 'GBP' ? 'pence' : 'cents'}</td>
          </tr>
          {/* {countries && filteredCountries.map((country, i)=>(
            <tr>
              <td>{country.Destination}</td>
              <td>{country.Zone}</td>
              <td>
                  {currency == 'GBP'
                    ? country.RateResidentialGBP
                    : currency == 'USD'
                    ? country.RateUSD
                    : country.RateEU}{' '}
                  {currency == 'GBP' ? 'pence' : 'cents'}
                </td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </>
  );
};

export default CountryScreen;
