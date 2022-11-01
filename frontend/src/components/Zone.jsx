import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Zone = ({zone}) => {
  return (
    <Card className='my-3 p-3 rounded'>

      <Card.Body>
      <Link to={`/zone`}>
          <Card.Title as='div'>
            <strong>{zone.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h5'>£{zone.tariff} pence p/min</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Zone