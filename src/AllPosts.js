import React, { Component } from 'react';

import { connect } from 'react-redux';

import EditComponent from './EditComponent';

import firebase from './firebase';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AllPosts extends Component {
    handleDelete = (post) => {
        this.props.dispatch({ type: 'DELETE', id: post.id })
        const ref = firebase.database().ref('users/' + post.key).
            ref.remove();
    }

    render() {
        console.log(this.props.posts)
        return (
            <div className="all_posts_container">
                <h2 className="all_post_heading">All Posts</h2>
                {this.props.loading ? <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div> : null}
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.props.posts.map((post) => (
                        <div key={post.id} className="post">
                            {post.editing ? <EditComponent key={post.id} post={post} /> :
                                (<div>
                                    <h3 className="all_post_heading">{post.title}</h3>
                                    <p className="message">{post.message}</p>

                                    <div className="control-buttons">
                                        {firebase.auth().currentUser.uid === post.uid ? <button className="delete" onClick={() => this.handleDelete(post)}>Delete Post</button> : null}
                                        {firebase.auth().currentUser.uid === post.uid ? <button className="edit" onClick={() => this.props.dispatch({ type: 'EDIT', id: post.id })}>Edit Post</button> : null}
                                    </div>
                                </div>
                                )
                            }

                        </div>
                    ))}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    loading: state.loading
})
export default connect(mapStateToProps)(AllPosts);