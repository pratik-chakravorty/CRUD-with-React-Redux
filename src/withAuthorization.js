import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import firebase from './firebase';

const withAuthorization = (authCondition) => (Component) => {
    class withAuthorization extends Component {
        componentDidMount() {
            firebase.auth().onAuthStateChanged(authUser => {
                if (!authCondition(authUser)) {
                    this.props.history.push('/')
                }
            });
        }
        render() {
            return <Component />
        }
    }
    return withRouter(withAuthorization)
}

export default withAuthorization;