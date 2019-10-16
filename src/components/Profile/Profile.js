import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase, FirebaseContext } from '../Firebase';

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