import React from 'react'
import { useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { UserContext } from '../context/AuthContext';
import { removeCookie } from '../utils/cookiesUtils';

const Header = ({setValue, setLoggedIn, currency}) => {

  const { currentUser, deleteCurrentUser  } = useContext(UserContext);
  const navigate = useNavigate();
  setLoggedIn(currentUser);

  const handleSelect = (key) =>{
    setValue(key)
  }

  const adminHandler = () =>{
    navigate('/admin')
  }

  const logoutHandler = () =>{
    removeCookie();
    deleteCurrentUser();
  }

  return (
    <header>
        <Navbar bg="primary" variant="primary" expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" >
                
              <NavDropdown title={currency} id='currency' onSelect={handleSelect}>
                  <NavDropdown.Item eventKey="GBP">
                    GBP
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="USD">
                    USD
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="EU">
                    EU
                  </NavDropdown.Item>
              </NavDropdown>
              {currentUser ? (
                <NavDropdown title={currentUser} id='username'>
                  <NavDropdown.Item onClick={adminHandler}>
                    Manage
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Admin Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header