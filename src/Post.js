import React, { Component } from 'react';
import AllPosts from './AllPosts.js'

import { connect } from 'react-redux';

import firebase from './firebase';
import { withRouter, Redirect } from 'react-router-dom';

import withAuthorization from './withAuthorization';


import generateId from './utils';
class Post extends Component {

    componentDidMount() {
        const ref = firebase.database().ref('users/');

        this.props.dispatch({ type: 'LOADING_TRUE' });
        ref.on('value', snapshot => {
            if (snapshot.val() === null) {
                this.props.dispatch({ type: 'LOADING_FALSE' });
                return;
            }
            [...Object.values(snapshot.val())].map((post) => {
                this.props.dispatch({ type: 'ADD_POST', data: post })
                this.props.dispatch({ type: 'LOADING_FALSE' })
            })
        })

    }




    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.titleInput.value;
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
        //validations
        if (title.length === 0 || title.length <= 5 || title.trim() === "") {
            this.props.dispatch({ type: 'POST_ERROR', message: 'Title has to be more than 5 characters' })
            return;
        }
        const message = this.messageInput.value;
        if (message.length <= 10 || message.trim() === "") {
            this.props.dispatch({ type: 'POST_ERROR', message: 'Message has to be more than 10 characters' })
            return;
        }
        //generate id
        const id = generateId();
        const newPost = {
            id,
            title,
            message,
            editing: false,
            errorMessage: ''
        }
        const postRef1 = firebase.database().ref('users/')
        const postKey = postRef1.push()
        const postRef = firebase.database().ref('users/' + postKey.key)
        const uid = firebase.auth().currentUser.uid
        postRef.set({
            id: id,
            title: title,
            message: message,
            editing: false,
            uid: uid,
            key: postKey.key,
            errorMessage: ''
        })

        if (this.props.posts.editing) {
            this.props.dispatch({
                type: 'ADD_EDIT_POST',
                data: newPost
            })
        }
        this.props.dispatch({
            type: 'ADDING_POST'

        })
        this.titleInput.value = '';
        this.messageInput.value = '';


    }

    handleLogout = () => {
        firebase.auth().signOut().then(() => {
            <Redirect to="/" />
        }).catch(() => {
            console.log('Error happened')
        })
        localStorage.removeItem('uid');
    }
    render() {
        return (
            <div className="post-grid">
                <div className="post-container">
                    <div className="logout-container">
                        <h2 className="righter"></h2>
                        <button className="logout" onClick={this.handleLogout}>Logout</button>
                    </div>
                    <div className="first-stuff">
                        <h2 className="post_heading">Post Content</h2>

                    </div>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input required type="text" ref={(input) => this.titleInput = input} placeholder="Enter Title for Post"
                        /><br /><br />
                        <textarea required ref={(input) => this.messageInput = input} placeholder="Enter the post" cols="28" rows="5"></textarea><br />
                        <button>Post</button>

                    </form>
                    {this.props.errors ? <p style={{ color: '#ff7777' }}>{this.props.errors.message}</p> : null}
                </div>
                <AllPosts posts={this.props.posts} />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    errors: state.errors

})
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(connect(mapStateToProps)(Post));