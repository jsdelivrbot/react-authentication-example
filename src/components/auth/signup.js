import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: {email, password, passwordConfirm }} = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email: </label>
          <input className="form-control" {...email} />
          { email.touched && email.error && <div className="error">{email.error}</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input className="form-control" {...password} type="password" />
          { password.touched && password.error && <div className="error">{password.error}</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password: </label>
          <input className="form-control" {...passwordConfirm} type="password" />
          { passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div> }
        </fieldset>
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email.';
  }

  if (!formProps.password) {
    errors.password = 'Please enter an password.';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an password confirmation.';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match.';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);