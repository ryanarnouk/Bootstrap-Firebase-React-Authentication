import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoMatch from './NoMatch';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import ForgotPassword from './PasswordChange/ForgotPassword';
import Profile from './Profile/Profile';
import Homepage from './Homepage/Homepage';
import ChangePassword from './PasswordChange/PasswordChange';

import RequireAuth from './ProtectedRoutes/RequireAuth';
import noRequireAuth from './ProtectedRoutes/noRequireAuth';

import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';

class App extends Component {
  constructor (props) {
    super(props);
  
    this.state = {
      authUser: null
    }
  }

  componentWillMount() {
    console.log(this.props.firebase);
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
      }
    )
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/signup" component={noRequireAuth(Signup)} />
            <Route path="/login" component={noRequireAuth(Login)} />
            <Route path="/profile" component={RequireAuth(Profile)} />

            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AuthUserContext.Provider>
    );
  }

}

export default withFirebase(App);
