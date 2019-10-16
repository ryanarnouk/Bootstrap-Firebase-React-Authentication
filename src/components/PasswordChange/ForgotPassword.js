import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  email: '',
  error: null
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
        this.setState({ ...INITIAL_STATE})
      }).catch(err => {
        this.setState({ err });
      });
    
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return ( 
      <div>
        <div style={{textAlign: "center"}}>
          <h1>Reset Password</h1>
          <form onSubmit={this.onSubmit}>
            <input 
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email"
            />
            <button disabled={isInvalid} type="submit">
              Reset My Password
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default withFirebase(ForgotPassword);
