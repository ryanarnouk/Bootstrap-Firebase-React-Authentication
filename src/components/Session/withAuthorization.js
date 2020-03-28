import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const withAuthorization = () => Component => {
  class WithAuthorization extends Component {
    render()  {
      return <Component {...this.props} />
    }
  }

  return WithAuthorization;
}

export default withAuthorization;