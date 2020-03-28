import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

// bootstrap imports
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Bootstrap Firebase React Auth</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-center" style={{marginRight: 70}}>
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title={this.props.username} id="basic-nav-dropdown" alignRight>
              <NavDropdown.Item href="/changepassword">Change Password</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.props.firebase.doSignOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    ); 
  }
}

const ProfileNavbar = withFirebase(Navigation);

class Profile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.props.firebase.getUserData().then((snapshot) => {
      this.setState({
        user: snapshot.val()
      });
    })
  }

  render() {
    return (
      <div>
        <ProfileNavbar username={this.state.user.username}/>
        <div className="align-items-center justify-content-center d-flex" style={{height: '80vh'}}>
          <div style={{textAlign: 'center'}}>
            <h3>Profile</h3>
            <p>Signed in as: {this.state.user.username}</p>
            <p>Email address: {this.state.user.email}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Profile);