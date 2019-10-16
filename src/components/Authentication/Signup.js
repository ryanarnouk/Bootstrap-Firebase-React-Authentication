import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { withFirebase, FirebaseContext } from '../Firebase';

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
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      }).catch(err => {
        this.setState({ error: err.message });
      });

    this.props.firebase.onAuthStateChanged(username);
    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onGoogleSubmit = event => {
    this.props.firebase.doSignInWithGoogle().then(socialAuthUser => {
      this.setState({ error: null });
      localStorage.setItem('user_name', socialAuthUser.user.displayName);
      localStorage.setItem('email', socialAuthUser.user.email);
      //window.location.href = '/profile';
    }).catch(error => {
      this.setState({error});
    })

    event.preventDefault();
  }

  onFacebookSubmit = event => {
    this.props.firebase.doSignInWithFacebook().then(socialAuthUser => {
        this.setState({ error: null });
        localStorage.setItem('user_name', socialAuthUser.user.displayName);
        localStorage.setItem('email', socialAuthUser.user.email);
        window.location.href = '/profile';
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onTwitterSubmit = event => {
    this.props.firebase.doSignInWithTwitter().then(socialAuthUser => {
      this.setState({ error: null });
      localStorage.setItem('user_name', socialAuthUser.user.displayName);
      localStorage.setItem('email', socialAuthUser.user.email);
      window.location.href = '/profile';
    })
    .catch(error => {
      this.setState({ error });
    });

    event.preventDefault();
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
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return ( 
      <div className="signupscreen" style={{fontFamily: 'Rubik'}}>
        <div className="signup">
          <h1>Sign Up</h1>
          <form onSubmit={this.onSubmit} style={{fontFamily: 'Rubik'}}>
            <input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Username"
              className='email'
            />
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email"
              className='email'
            />
            <input
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              className='password'
            />
            <input
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
              className='password'
            /><br />
            <button type="submit" className="submit" disabled={isInvalid}>Sign Up</button>
            {error && <p>{error.message}</p>}
            <p style={{fontSize: 13}}>By creating an account you agree to our <Link to="/privacypolicy" style={{color: 'dodgerblue'}}>Terms & Privacy</Link></p>
          </form>
          {error ? <p>{error}</p>: null}
          <div>
            <h2>Or sign up with:</h2>
            <div>
              <button onClick={this.googleSubmit}>Google</button>
              <button onClick={this.onFacebookSubmit}>Facebook</button>
              <button onClick={this.onGoogleSubmit}>Twitter</button>
            </div>
          </div>
          <div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    );   
  }
}
export default withRouter(withFirebase(SignUp));