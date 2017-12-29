import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createPost} from "../actions/index";

class PostsNew extends React.Component {

    //field : contains event handlers which we will assign to Field component
    renderField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ?
            'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input}/>
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            console.log('post created');
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
                <Link className="btn btn-danger" name="Cancel" to="/">Cancel</Link>
            </form>
        );
    };
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter title!';
    }
    if (!values.categories) {
        errors.categories = 'Enter categories!';
    }
    if (!values.content) {
        errors.content = 'Enter content!';
    }
    return errors;
}

function mapDispatchToAction(dispatch) {
    return bindActionCreators({createPost}, dispatch);
}

export default reduxForm({
    form: 'PostsNewForm',
    validate: validate
})(
    connect(null, mapDispatchToAction)(PostsNew)
);