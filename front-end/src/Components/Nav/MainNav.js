import React  from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function MainNav() {
  let auth = localStorage.getItem("user");
  let redirect = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    redirect("/login");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            {auth &&
              <>
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/profile">My Profile</Nav.Link>
                <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;