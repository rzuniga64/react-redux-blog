import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {

    componentDidMount() {
        if (!this.props.post) {
            const {id} = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        // The component is getting rendered to the screen one time before we even attempt to fetch our posts. During
        // that time we don't have any posts with the correct id in memory. When we try to reach into our object with
        // all the posts mapStateToProps will return undefined. So make sure we have a post first!
        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
          Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

/**
 *  When this component is to be rendered, mapStateToProps is called to find out what props the component need. It is
 *  passed all the props headed to PostsShow. ownProps == this.props
 *  First parameter is application state.
 *  Second parameter is the props object that is headed or going to PostsShow
 *  @param posts
 *  @param ownProps
 *  @returns {{post: *}}
 */
function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
