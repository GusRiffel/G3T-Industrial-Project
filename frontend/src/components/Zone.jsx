import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Zone = ({ zone }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        {zone.land_zone ? (
          <Link to={`/zones/${zone.land_zone}`}>
            <Card.Title as="div">
              <strong>Zone {zone.land_zone}</strong>
            </Card.Title>
          </Link>
        ) : (
          <Link to={`/zones/${zone.mobile_zone}`}>
            <Card.Title as="div">
              <strong>Zone {zone.mobile_zone}</strong>
            </Card.Title>
          </Link>
        )}

        <Card.Text as="h6">
          £{zone.mobile_tariff ? zone.mobile_tariff : zone.land_tariff} pence
          p/min
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Zone;
