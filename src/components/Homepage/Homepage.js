import React, { Component } from 'react';

// import nav
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const HomeNavbar = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Bootstrap Firebase React Auth</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav className="justify-content-center">
        <Nav.Link href="/login">Login</Nav.Link>
        <Button href="/signup" style={{marginLeft: 15, marginRight: 10}}>Sign Up</Button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);


class Homepage extends Component {
  render() {
    return (
      <div> 
        <HomeNavbar />
        <Container fluid>
          <h2>Welcome to Bootstrap-Firebase-React-Authentication</h2>
          <p>This is a responsive web application that uses Firebase's API for authentication while using react and react-bootstrap.</p>
          <p>Follow the steps in the README file found in the repository <a href="https://github.com/ryanarnouk/Bootstrap-Firebase-React-Authentication">here</a> in order to set up the authentication service with Firebase and get the app up and running.</p>
          <p>Once all the features with Firebase is functioning including Login, Signup, Forgot Password, and Change password this homepage and the profile page will serve as the starting point to build off of this template/boilerplate to build your app with authentication built in. </p>
          <p>This project uses Bootstrap, one of the most popular frontend frameworks and offers responsive features to build off of. This is done using react-bootstrap. </p>
          <p>It also harnesses the capabilities of React context for the authentication state.</p>
        </Container>
      </div>
    );
  }
}

export default Homepage;