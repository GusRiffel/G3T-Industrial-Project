import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';

const AdminScreen = () => {

  const { currentToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const deleteHandler = (id) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${currentToken}`,
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    };
    axios
    .delete(`http://localhost:3000/api/zones/delete/${id}`, config)
    .then((res) => {
      console.log('deleted')
    });
  }



  useEffect(() => {
    const loadZones = async () => {
      try {

        const docs = await axios.get('/api/zones');
        setDocuments(docs.data)
        
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
    <Row>
      <Col><h2>Displaying all records</h2></Col>
      <Col><Link to='/create'><Button>Create new record</Button></Link></Col>
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
          {documents && documents.map((doc, i)=>(
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
            <td><Link to={`/edit/${doc.ID}`}><Button><i className='fas fa-edit'></i></Button></Link></td>
            <td><Button onClick={()=>{deleteHandler(doc.ID)}}><i className='fas fa-trash'></i></Button></td>
          </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminScreen;
