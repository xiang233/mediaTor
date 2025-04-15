import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Logout } from '../../services/Logout';
import {FaStore,FaUserAlt, FaHome, FaNewspaper}from "react-icons/fa";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
function MediaNavbar() {
  console.log("header rerender")
  const { isLoggedIn, loggedUser, setAuthState} = useAuth();

  const navigate = useNavigate();


  return (
      <Navbar bg="primary" variant="dark">
        <Container>
          <LinkContainer to=''>
          <Navbar.Brand>Hello</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <Nav.Link as ={Link} to={''}><FaHome/>Home</Nav.Link>
            <Nav.Link as={Link} to={'feed'}><FaNewspaper />Feed</Nav.Link>
            <Nav.Link as={Link} to={'/shop'}><FaStore/>Shop</Nav.Link>
            {!isLoggedIn && 
            <LinkContainer to='/login'>
            <Nav.Link><FaUserAlt/>login</Nav.Link>
            </LinkContainer>
            }
            {isLoggedIn && 
            <NavDropdown title={loggedUser["username"]} id="basic-nav-dropdown">
              <Container>
              <LinkContainer to={`/user/${loggedUser["id"]}`}>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              </Container>
            <Container onClick = {()=>{Logout({setAuthState, navigate})}}>
              <NavDropdown.Item >Log out</NavDropdown.Item>
              </Container>
            </NavDropdown>
          }
          </Nav>
        </Container>
      </Navbar>
  )
}

export default MediaNavbar