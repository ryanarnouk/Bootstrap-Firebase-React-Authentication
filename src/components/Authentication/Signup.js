import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';

// bootstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/COntainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// icons
import { FaTwitter, FaFacebook, FaGoogle } from 'react-icons/fa';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne, passwordTwo } = this.state;

    if (passwordOne !== passwordTwo) {
      this.setState({ error: "Password does not match"});
    } else {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          // Create a user in your Firebase realtime database
          return this.props.firebase
            .user(authUser.user.uid)
            .set({
              username,
              email,
            });
        }).catch(error => {
          this.setState({error: error.message});
        })
    } 

    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // social sign in

  onGoogleSubmit = event => {
    this.props.firebase.doSignInWithGoogle().then(socialAuthUser => {
      this.setState({ error: null });
      return this.props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username: socialAuthUser.user.displayName, 
          email: socialAuthUser.user.email
        });
    }).catch(error => {
      this.setState({error: error.message});
    })

    event.preventDefault(); // prevent form reloading page
  }

  onFacebookSubmit = event => {
    this.props.firebase.doSignInWithFacebook().then(socialAuthUser => {
      this.setState({ error: null });
      return this.props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username: socialAuthUser.user.displayName, 
          email: socialAuthUser.user.email
        });
    }).catch(error => {
      this.setState({error: error.message});
    });

    event.preventDefault(); // prevent form reloading page
  }

  onTwitterSubmit = event => {
    this.props.firebase.doSignInWithTwitter().then(socialAuthUser => {
      this.setState({ error: null });
      return this.props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username: socialAuthUser.user.displayName, 
          email: socialAuthUser.user.email
        });
    }).catch(error => {
      this.setState({error: error.message});
    });

    event.preventDefault(); // prevent form reloading page
  }

  render() { 
    const {
      username, 
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid = 
      passwordOne === '' ||
      passwordTwo === '' ||
      email === '' ||
      username === '';

    return (
      <Container fluid>
        <Row className="justify-content-center align-items-center" style={{height: '80vh'}}>
          <Col xs={10} md={5} sm={7}>
            <Form onSubmit={this.onSubmit}>
              <h1 style={{textAlign: 'center'}}>Sign Up</h1>
              <Form.Group controlId="signupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  name="username"
                  placeholder="Username" 
                  onChange={this.onChange}
                  value={username}
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="signupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  name="email"
                  type="email"
                  placeholder="Email" 
                  value={email}
                  onChange={this.onChange}  
                />
              </Form.Group>
              <Form.Group controlId="signupPasswordOne">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  name="passwordOne"
                  type="password" 
                  placeholder="Password" 
                  onChange={this.onChange}
                  value={passwordOne}
                />
              </Form.Group>
              <Form.Group controlId="signupPasswordTwo">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  name="passwordTwo"
                  type="password" 
                  placeholder="Confirm Password" 
                  onChange={this.onChange}
                  value={passwordTwo}
                />
              </Form.Group>
              <Form.Group>
                {error ? <Form.Text className="text-danger">{error}</Form.Text>: null}
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isInvalid}>
                Sign Up
              </Button>
              <Form.Text style={{textAlign: 'center', margin: 10}}>Or sign up with:</Form.Text>
              <Form.Group controlId="socialIcons" style={{textAlign: 'center'}}>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary" style={{backgroundColor: '#38A1F3', border: 0}} onClick={this.onTwitterSubmit}><FaTwitter /></Button>
                  <Button variant="secondary" style={{backgroundColor: '#DB4437', border: 0}} onClick={this.onGoogleSubmit}><FaGoogle /></Button>
                  <Button variant="secondary" style={{backgroundColor: '#4267b2', border: 0}} onClick={this.onFacebookSubmitSubmit}><FaFacebook /></Button>
                </ButtonGroup>
              </Form.Group>
              <Form.Text style={{textAlign: 'center', margin: 10}}>Already have an account? <Link to="/login">Login</Link></Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(withFirebase(SignUp));