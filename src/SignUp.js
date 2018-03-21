import React, { Component } from 'react';


import { Link, withRouter } from 'react-router-dom';

import firebase from './firebase';

import { connect } from 'react-redux';

class SignUp extends Component {
    componentWillMount() {
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push('/home');
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const email = this.getEmail.value;
        const password = this.getPassword.value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('Signed In')
                this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
                this.props.history.push('/home');
            })
            .catch((error) => {
                this.props.dispatch({ type: 'ERROR_RECEIVED', message: error.message })

            })

    }
    render() {
        return (
            <div className="login-container">
                <h2 className="sign_in">Sign Up</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input type="text" ref={(input) => this.getEmail = input} placeholder="Enter email" /><br /><br />
                    <input type="password" ref={(input) => this.getPassword = input} placeholder="Enter Password" /><br /><br />
                    <button>Sign Up</button>
                </form>
                <p className="sub-text center">Already have an account, <Link to="/">Sign In</Link></p>
                {this.props.errors ? <p style={{ color: '#ff7777' }}>{this.props.errors.message}</p> : null}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    errors: state.errors
})
export default withRouter(connect(mapStateToProps)(SignUp));