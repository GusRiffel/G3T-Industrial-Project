import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import zones from '../zones';
import Zone from '../components/Zone';
import axios from 'axios';

const Homescreen = () => {
  const [landline, setLandline] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [landCountries, setLandCountries] = useState(null);
  const [mobCountries, setMobCountries] = useState(null);
  const [landTariff, setLandTariff] = useState('');
  const [mobTariff, setMobTariff] = useState('');
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const setZones = (data, zone) => {
    const lines = [];
    if (zone == 'landline') {
      data.forEach((value) => {
        lines.push({
          zone: value.land_zone,
          tariff: value.land_tariff,
        });
      });
    } else {
      data.forEach((value) => {
        lines.push({
          zone: value.mobile_zone,
          tariff: value.mobile_tariff,
        });
      });
    }

    const unique_lines = [
      ...new Map(lines.map((item) => [item['zone'], item])).values(),
    ];
    unique_lines.sort((a, b) =>
      a.zone > b.zone ? 1 : b.zone > a.zone ? -1 : 0
    );
    return unique_lines;
  };


  useEffect(() => {
    const loadZones = async () => {
      try {
        const countries = await axios.get('/api/findAll');
        setLandline(setZones(countries.data, 'landline'));
        setMobile(setZones(countries.data, 'mobile'));

        const land_countries = [];
        countries.data.forEach((value) => {
          land_countries.push({
            key: value.country,
            value: value.land_tariff,
          });
        });
        setLandCountries([{ key: 'Select a country', value: '' }, ...land_countries]);

        const mob_countries = [];
        countries.data.forEach((value) => {
          mob_countries.push({
            key: value.country,
            value: value.mobile_tariff,
          });
        });
        setMobCountries([{ key: 'Select a country', value: '' }, ...mob_countries]);

      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    loadZones();
  }, []);
  //landline && console.log(landline)
  //mobile && console.log(mobile)

  return (
    <>
      <div className="pb-5">
        <h2 className="bg-primary text-white my-2 p-2">
          Search for Rate by Country
        </h2>
        <p>
          To make life easier, we've grouped countries into simple Zones - you
          can search either by country or view the all the destinations in a
          charging zone.{' '}
        </p>
        <Row>
          <Col>
            <Row>
              <Col>
                <h4 className="text-dark">Landlines</h4>
              </Col>
              <Col>
                <Form.Select onChange={(e)=>{setLandTariff(e.target.value)}}>
                  {landCountries &&
                    landCountries.map((option) => {
                      return <option value={option.value}>{option.key}</option>;
                    })}
                </Form.Select>
              </Col>
              <Col>
                {/* <Button variant="primary">Go</Button> */}
                {<h5>£ {landTariff} pence p/min</h5>}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <h4 className="text-dark">Mobiles</h4>
              </Col>
              <Col>
                <Form.Select onChange={(e)=>{setMobTariff(e.target.value)}}>
                {mobCountries &&
                    mobCountries.map((option) => {
                      return <option value={option.value}>{option.key}</option>;
                    })}
                </Form.Select>
              </Col>
              <Col>
                {/* <Button variant="primary">Go</Button> */}
                {<h5>£ {mobTariff} pence p/min</h5>}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <h2 className="bg-primary text-white my-2 p-2">
          Search for Destinations by Zone
        </h2>
        <Row>
          <Col>
            <h3>Landline zones</h3>
            <Row>
              {landline &&
                landline.map((zone, i) => (
                  <Col key={i} className="col-sm-4">
                    <Zone zone={zone} />
                  </Col>
                ))}
            </Row>
          </Col>

          <Col>
            <h3>Mobile zones</h3>
            <Row>
              {mobile &&
                mobile.map((zone, i) => (
                  <Col key={i} className="col-sm-4">
                    <Zone zone={zone} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Homescreen;
