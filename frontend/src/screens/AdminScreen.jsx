import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import axios from 'axios';
import { UserContext } from '../context/AuthContext';

const AdminScreen = () => {
  const { currentToken } = useContext(UserContext);
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  const deleteHandler = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${currentToken}`,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    axios
      .delete(`http://localhost:3000/api/zones/delete/${id}`, config)
      .then((res) => {
        res.status == '204' ? setSuccess(true) : null; 
        window.scrollTo(0,0);
      }).catch((err) => {
        setError(err);
        window.scrollTo(0,0);
      });
  };

  useEffect(() => {
    const loadZones = async () => {
      try {
        const docs = await axios.get('/api/zones');
        setDocuments(docs.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    loadZones();
  }, [deleteHandler]);

  return (
    <>
      {error && <Message variant="danger">{error.message}</Message>}
      {success && <Message variant="success">{'Record deleted successfully'}</Message>}
      {!loaded ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col>
              <h2>Displaying all records</h2>
            </Col>
            <Col>
              <Link to="/create">
                <Button >Create new record</Button>
              </Link>
            </Col>
          </Row>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Key</th>
                <th>Destination</th>
                <th>MAGCode</th>
                <th>MAGDestination</th>
                <th>Zone</th>
                <th>RateBusinessGBP</th>
                <th>RateResidentialGBP</th>
                <th>RateEU</th>
                <th>RateUSD</th>
              </tr>
            </thead>
            <tbody>
              {documents &&
                documents.map((doc, i) => (
                  <tr key={i}>
                    <td>{doc.Key}</td>
                    <td>{doc.Destination}</td>
                    <td>{doc.MAGCode}</td>
                    <td>{doc.MAGDestination}</td>
                    <td>{doc.Zone}</td>
                    <td>{doc.RateBusinessGBP}</td>
                    <td>{doc.RateResidentialGBP}</td>
                    <td>{doc.RateEU}</td>
                    <td>{doc.RateUSD}</td>
                    <td>
                      <Link to={`/edit/${doc.ID}`}>
                        <Button variant="outline-primary">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button variant="outline-danger"
                        onClick={() => {
                          deleteHandler(doc.ID);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>{' '}
        </>
      )}
    </>
  );
};

export default AdminScreen;
