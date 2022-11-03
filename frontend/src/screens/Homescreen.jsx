import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import zones from '../zones';
import Zone from '../components/Zone';
import axios from 'axios';

const Homescreen = () => {
  const [landline, setLandline] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadZones = async () => {
      try {
        const landline = await axios.get('/api/zones/landline');
        const mobile = await axios.get('/api/zones/mobile');
        //const sorted = landline.data.sort((a,b) => (a.land_zone > b.land_zone) ? 1 : ((b.land_zone > a.land_zone) ? -1 : 0))
        //console.log(sorted)
        setLandline(landline.data.sort((a,b) => (a.land_zone > b.land_zone) ? 1 : ((b.land_zone > a.land_zone) ? -1 : 0)));
        setMobile(mobile.data.sort((a,b) => (a.mobile_zone > b.mobile_zone) ? 1 : ((b.mobile_zone > a.mobile_zone) ? -1 : 0)));
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    loadZones();
  }, []);
  //console.log(data)

  return (
    <>
    <div className="pb-5">
      <h2 className="bg-primary text-white my-2 p-2">
        Search for Rate by Country
      </h2>
      <p>
        To make life easier, we've grouped countries into simple Zones - you can
        search either by country or view the all the destinations in a charging
        zone.{' '}
      </p>
      <Row>
        <Col>
          <Row>
            <Col>
              <h4 className="text-dark">Landlines</h4>
            </Col>
            <Col>
              <Form.Select>
                <option>Select country</option>
              </Form.Select>
            </Col>
            <Col>
              <Button variant="primary">Go</Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
          <Col>
              <h4 className="text-dark">Mobiles</h4>
            </Col>
            <Col>
              <Form.Select>
                <option>Select country</option>
              </Form.Select>
            </Col>
            <Col>
              <Button variant="primary">Go</Button>
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
