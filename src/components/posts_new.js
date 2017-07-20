import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    /**
     *  Method returns some JSX. We have to wire up the JSX that we are adding in here to the Field component. To help
     *  do that a parameter is passed, field. The 'field' object contains some event handlers that we need to wire up
     *
     * @param field
     * @returns {XML}
     */
    renderField(field) {

        // Use destructuring to access properties on nested objects.
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title For Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                  label="Categories"
                  name="categories"
                  component={this.renderField}
                />
                <Field
                  label="Post Content"
                  name="content"
                  component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger btn-cancel">Cancel</Link>
            </form>
        );
    }
}

/**
 *  The validate function will be called automatically for us at certain points in the form’s lifecycle such as when
 *  the user submits the form.
 * @param values. Values is an object that contains all the values that a user has entered into the form.
 * @returns {{}}
 */
function validate(values) {
    // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title";
    }
    if (!values.categories) {
        errors.categories = 'Enter some categories';
    }
    if (!values.content) {
        errors.content = 'Enter some content please';
    }

      // If errors is empty, the form is fine to submit
      // If errors has *any* properties, redux form assumes form is invalid
      return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'    // name of form must be unique!
})(
    connect(null,{ createPost })(PostsNew)
);
