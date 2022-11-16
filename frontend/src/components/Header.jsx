import React from 'react'
import { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const Header = ({setValue}) => {

  const {userInfo, setUserInfo} = useState();
  //const [currency, setCurrency] = useState('GBP');
  const logoutHandler = () =>{

  }

  const handleSelect = (key) =>{
    setValue(key)
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
            <Nav className="ms-auto" onSelect={handleSelect}>
               <NavDropdown title='Currency' id='currency'>
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
                {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
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