import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';


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
        window.location.href = '/profile';
        // set username and email to localstorage
        localStorage.setItem('user_name', res.user.displayName);
        localStorage.setItem('email', res.user.email);
        //localStorage.setItem('user', res.user);
      }).catch(err => {
        this.setState({ error: err.message });
      });
    
    // prevent form submitting and page reloading
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = (values) => {
    this.props.signInAction(values, this.props.history);
  }

  componentDidMount() {
    localStorage.removeItem('message');
  }

  componentWillMount() {
    if(localStorage.getItem('message') === null) {
      this.setState({ errorPopup: false });
    } else {
      this.setState({ errorPopup: true });
    }
  }

  onGoogleSubmit = event => {
    this.props.firebase.doSignInWithGoogle().then(socialAuthUser => {
      this.setState({ error: null });
      localStorage.setItem('user_name', socialAuthUser.user.displayName);
      localStorage.setItem('email', socialAuthUser.user.email);
      window.location.href = '/profile';
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

  render () {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email"
            className="email"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            className="password"
          /><br />
          <button disabled={isInvalid} type="submit" className="submit">
            Sign In
          </button>
          {error ? <p>{error}</p>: null}
        </form>
        <div>
          <h2>Or log in with:</h2>
          <div>
            <button onClick={this.onTwitterSubmit}>Twitter</button>
            <button onClick={this.onFacebookSubmit}>Facebook</button>
            <button onClick={this.onGoogleSubmit}>Google</button>
          </div>
        </div>
        <p><Link to="/forgotpassword">Forgot Password?</Link></p>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    );
  }
}

export default withFirebase(Login);
