import React, { Component } from 'react';

// bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NoMatch extends Component {
  render() { 
    return (  
      <Container>
        <Row className="justify-content-center align-items-center" style={{height: '100vh'}}>
          <Col xs={10} md={5} sm={7} style={{textAlign: 'center'}}>
            <h1>404</h1>
            <h3>Page not found</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}
 
export default NoMatch;