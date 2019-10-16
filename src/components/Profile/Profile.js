import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

const SignOut = withFirebase(SignOutButton);

class Profile extends Component {
  render() {
    return (
      <div>
        <p>Logged In</p>
        <SignOut />
      </div>
    )
  }
}

export default withFirebase(Profile);