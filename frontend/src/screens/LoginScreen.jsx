import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Cookies from 'js-cookie';
import { UserContext } from '../context/AuthContext';
import { createCookie } from "../utils/cookiesUtils";

const LoginScreen = () => {

  const { createCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();


  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  // const createCookie = (data) => {
  //   Cookies.set("auth", JSON.stringify(data));
  // };

  const submitHandler = (e) => {
    e.preventDefault();

    const config = { headers: {"Content-Type":"application/json"}};
    const data = { user: user, password: password };
    axios.post('http://localhost:3000/api/user/signIn', data, config).then((res) => {
        createCookie(res.data);
        createCurrentUser(res.data.user);
        });
    navigate("/");
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loaded && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='user' className='m-3'>
          <Form.Label>User</Form.Label>
          <Form.Control
            type='user'
            placeholder='Enter user'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='m-3'>
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='m-3'>
          Sign In
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen