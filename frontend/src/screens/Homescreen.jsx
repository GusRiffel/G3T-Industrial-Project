import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
  const [selectedLand, setSelectedLand] = useState('');
  const [selectedMob, setSelectedMob] = useState('');
  const [currency, setCurrency] = useState('GBP');
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const setZones = (data, currency) => {
    const lines = [];

    data.forEach((value) => {
      if(value.Zone != '?'){
        switch(currency) {
          case 'GBP':
            lines.push({
              zone: value.Zone,
              tariff: value.RateBusinessGBP,
            });
            break;
          case 'USD':
            lines.push({
              zone: value.Zone,
              tariff: value.RateUSD,
            });
            break;
          case 'EU':
            lines.push({
              zone: value.Zone,
              tariff: value.RateEU,
            });
            break;
          default:
            lines.push({
              zone: value.Zone,
              tariff: value.RateBusinessGBP,
            });
        }
      }
      
    });

    const unique_lines = [
      ...new Map(lines.map((item) => [item['zone'], item])).values(),
    ];

    unique_lines.sort((a, b) =>
      a.zone > b.zone ? 1 : b.zone > a.zone ? -1 : 0
    );
    return unique_lines;
  };

  const handleLandSelect = (e) => {
    setLandTariff(e.target.value);
    const selected = document.getElementById('landSelect');
    setSelectedLand(selected.options[selected.selectedIndex].text);
  };

  const handleMobSelect = (e) => {
    setMobTariff(e.target.value);
    const selected = document.getElementById('mobSelect');
    setSelectedMob(selected.options[selected.selectedIndex].text);
  };
  console.log(selectedMob);
  console.log(selectedLand);

  useEffect(() => {
    const loadZones = async () => {
      try {
        //const countries = await axios.get('/api/findAll');
        //setLandline(setZones(countries.data, 'landline'));
        //setMobile(setZones(countries.data, 'mobile'));
        const landlines = await axios.get('/api/countries/landline');
        const mobiles = await axios.get('/api/countries/mobile');

        setLandline(setZones(landlines.data, currency));
        setMobile(setZones(mobiles.data, currency));

        const land_countries = [];
        landlines.data.forEach((value) => {
          land_countries.push({
            key: value.Destination,
            value: value.RateBusinessGBP,
          });
        });
        setLandCountries([
          { key: 'Select a country', value: '' },
          ...land_countries,
        ]);

        const mob_countries = [];
        mobiles.data.forEach((value) => {
          mob_countries.push({
            key: value.Destination,
            value: value.RateBusinessGBP,
          });
        });
        setMobCountries([
          { key: 'Select a country', value: '' },
          ...mob_countries,
        ]);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    loadZones();
  }, []);

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
                <Form.Select
                  id="landSelect"
                  onChange={(e) => handleLandSelect(e)}
                >
                  {landCountries &&
                    landCountries.map((option) => {
                      return <option value={option.value}>{option.key}</option>;
                    })}
                </Form.Select>
              </Col>
              <Col>
                <Link to={selectedLand ? `/countries/${selectedLand}` : '/'}>
                  <Button variant="primary">Go</Button>
                </Link>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>{landTariff && <h5>£ {landTariff} {currency} p/min</h5>}</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <h4 className="text-dark">Mobiles</h4>
              </Col>
              <Col>
                <Form.Select
                  id="mobSelect"
                  onChange={(e) => handleMobSelect(e)}
                >
                  {mobCountries &&
                    mobCountries.map((option) => {
                      return <option value={option.value}>{option.key}</option>;
                    })}
                </Form.Select>
              </Col>
              <Col>
                <Link to={selectedMob ? `/countries/${selectedMob}` : '/'}>
                  <Button variant="primary">Go</Button>
                </Link>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>{mobTariff && <h5>£ {mobTariff} {currency} p/min</h5>}</Col>
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
                    <Zone zone={zone} curr={currency}/>
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
                    <Zone zone={zone} curr={currency}/>
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
