import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Zone = ({ zone, curr }) => {

  let limit = (curr === 'GBP') ? 0.18 : (curr === 'EU') ? 0.27 : 0.32;

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        {
          <Link to={`/zones/${zone.zone}`}>
            <Card.Title as="div">
              <strong>Zone {zone.zone}</strong>
            </Card.Title>
          </Link>
        }

        <Card.Text as="h6">
          {parseFloat(zone.tariff) <= limit ? zone.tariff : `Over ${limit}`} {curr} {' '}
          p/min
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Zone;
