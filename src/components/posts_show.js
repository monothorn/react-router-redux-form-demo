import React from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from "../actions/index";
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';


class PostsShow extends React.Component {

    componentDidMount() {
        if (!this.props.post) {
            const id = this.props.match.params.id;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick() {
        const id = this.props.match.params.id;
        this.props.deletePost(id,()=>{
            this.props.history.push('/');
        });
    }

    render() {
        const {post} = this.props;
        if (!post) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to="/">Back</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete
                </button>
                <h3>{post.title}</h3>
                <h6>{post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const posts = state.posts;
    return {post: posts[ownProps.match.params.id]};
}

function mapDispatchToAction(dispatch) {
    return bindActionCreators({fetchPost, deletePost}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToAction)(PostsShow);