import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

// bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const INITIAL_STATE = {
  email: '',
  error: null,
  message: ''
}

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase 
      .doPasswordReset(email)
      .then((res) => {
        this.setState({ ...INITIAL_STATE});
        this.setState({ message: 'An email has been sent to reset your password'});
      }).catch(error => {
        this.setState({ error: error.message });
      });
    
    event.preventDefault(); // prevent form submission reloading page
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { email, error, message } = this.state;

    const isInvalid = email === '';

    return (
      <Container fluid>
        <Row className="justify-content-center align-items-center" style={{height: '80vh'}}>
          <Col xs={10} md={5} sm={7}>
            <h1 style={{textAlign: 'center'}}>Forgot Password?</h1>
            <Form.Text style={{textAlign: 'center', fontSize: 18}}>Enter email to reset password.</Form.Text>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="forgotpasswordEmail">
                <Form.Control 
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.onChange}
                  style={{marginTop: 10, marginBottom: 10}}
                />
              </Form.Group>
              <Form.Group>
                {error ? <Form.Text className="text-danger">{error}</Form.Text>: null}
                {message ? <Form.Text className="text-success">{message}</Form.Text>: null}
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isInvalid}>
                Reset
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withFirebase(ForgotPassword);
