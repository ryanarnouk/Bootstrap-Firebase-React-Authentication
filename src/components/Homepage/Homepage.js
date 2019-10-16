import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Homepage extends Component {
  render() {
    return (
      <div>
        <p>Homepage</p>
        <p><Link to="/login">Login</Link></p>
        <p><Link to="/signup">Sign Up</Link></p>
      </div>
    );
  }
}

export default Homepage;