import React, { Component } from 'react';

import { Link } from 'react-router-dom';

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
  email: '',  
  password: '', 
  error: null
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setState({ ...INITIAL_STATE });
      }).catch(error => {
        this.setState({ error: error.message });
      });
    
    // prevent form submitting and page reloading
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // social sign ins

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
      this.setState({ error: error.message });
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
      this.setState({ error: error.message });
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
      this.setState({ error: error.message });
    });
 
    event.preventDefault(); // prevent form reloading page
  }

  render () {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Container fluid>
        <Row className="justify-content-center align-items-center" style={{height: '80vh'}}>
          <Col xs={10} md={5} sm={7}>
            <h1 style={{textAlign: 'center'}}>Login</h1>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  name="email"
                  type="email"
                  placeholder="Email" 
                  value={email}
                  onChange={this.onChange}  
                />
              </Form.Group>
              <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  name="password"
                  type="password" 
                  placeholder="Password" 
                  onChange={this.onChange}
                  value={password}
                />
                <Form.Text className="text-muted" style={{justifyContent: 'flex-end', display: 'flex'}}>
                  <Link to="/forgotpassword">Forgot Password?</Link>
                </Form.Text>
              </Form.Group>
              <Form.Group>
                {error ? <Form.Text className="text-danger">{error}</Form.Text>: null}
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isInvalid}>
                Sign In
              </Button>
              <Form.Text style={{textAlign: 'center', margin: 10}}>Or sign up with:</Form.Text>
              <Form.Group controlId="socialIcons" style={{textAlign: 'center'}}>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary" style={{backgroundColor: '#38A1F3', border: 0}} onClick={this.onTwitterSubmit}><FaTwitter /></Button>
                  <Button variant="secondary" style={{backgroundColor: '#DB4437', border: 0}} onClick={this.onGoogleSubmit}><FaGoogle /></Button>
                  <Button variant="secondary" style={{backgroundColor: '#4267b2', border: 0}} onClick={this.onFacebookSubmitSubmit}><FaFacebook /></Button>
                </ButtonGroup>
              </Form.Group>
              <Form.Text style={{textAlign: 'center', margin: 10}}>Don't have an account? <Link to="/signup">Sign Up</Link></Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    ); 
  }
}

export default withFirebase(Login);
