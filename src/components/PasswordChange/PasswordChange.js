import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

// bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const INITIAL_STATE = {
  confirmPassword: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  message: ''
}

class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { confirmPassword, passwordOne, passwordTwo } = this.state;

    if (passwordOne !== passwordTwo) {
      this.setState({error: "Password does not match"});
    } else {
      this.props.firebase.checkCredentials(confirmPassword).then(() => {
        this.props.firebase
          .doPasswordUpdate(passwordOne)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.setState({ message: 'Password successfully changed.'})
          })
          .catch(error => {
            this.setState({ error: error.message});
          });
      }).catch((error) => {
        this.setState({ error: error.message});
      }) 
    }

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { confirmPassword, passwordOne, passwordTwo, error, message } = this.state;

    const isInvalid =
      passwordOne === '' ||
      passwordTwo === '' ||
      confirmPassword === '';

    return (
      <Container fluid>
        <Row className="justify-content-center align-items-center" style={{height: '80vh'}}>
          <Col xs={10} md={5} sm={7}>
            <Form onSubmit={this.onSubmit}>
              <h1 style={{textAlign: 'center'}}>Change Password</h1>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control 
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Current Password"
                />
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control 
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="New Password"
                />
              </Form.Group>
              <Form.Group controlId="confirmNewPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm New Password"
                />
              </Form.Group>
              <Form.Group>
                {error ? <Form.Text className="text-danger">{error}</Form.Text>: null}
                {message ? <Form.Text className="text-success">{message}</Form.Text>: null}
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isInvalid}>
                Change Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withFirebase(PasswordChange);