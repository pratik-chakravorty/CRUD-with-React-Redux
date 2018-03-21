import React, { Component } from 'react';

import { connect } from 'react-redux';

import firebase from './firebase';

class EditComponent extends Component {
    handleFinalEdit = (e) => {

        e.preventDefault()
        const title = this.getTitleInput.value
        const message = this.getMessageInput.value
        this.props.dispatch({
            type: 'ADD_EDIT_POST',
            data: {
                id: this.props.post.id,
                title,
                message,
                editing: this.props.post.editing
            }
        })
        let updates = {}
        updates['users/' + this.props.post.key] = this.props.post;
        updates['users/' + this.props.post.key].title = title;
        updates['users/' + this.props.post.key].message = message;
        firebase.database().ref().update(updates)

    }
    render() {
        return (
            <form className="form" onSubmit={this.handleFinalEdit}>
                <h3 className="all_post_heading">Edit Post</h3>
                <input type="text" ref={(input) => this.getTitleInput = input} defaultValue={this.props.post.title} /> <br />
                <textarea ref={(input) => this.getMessageInput = input} defaultValue={this.props.post.message} cols="28" rows="5"></textarea><br />
                <button>Edit</button>
            </form >
        );
    }
}



export default connect()(EditComponent);