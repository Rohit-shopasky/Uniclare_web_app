import React, { Component } from 'react'

import { Input, Form, Button, Message } from 'semantic-ui-react';

import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { setRegno, fetchStudentInfo } from '../../../actions';

class StudentForm extends Component {

  TextRegno = (pinput) => {
    return (
      <Form.Field>
        <label>{pinput.label}</label>
        <Input {...pinput.input}
          placeholder={pinput.placeholder} type={pinput.type}
          autoComplete="off" minLength={pinput.minlen} maxLength={pinput.maxlen} />
        <div>{this.renderError(pinput.meta)}</div>
      </Form.Field>
    )
  }

  renderError({ error: errorMessage, touched }) {
    if (errorMessage && touched) {
      return (
        <Message error header={errorMessage} />
      )
    }
  }

  submit = (values) => {
    console.log(values);

  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.submit)} className="ui form error" >
          <Field name="regno" label="Reg. No." type="text" placeholder="Reg. No."
            minlen="8" maxlen="10"
            component={this.TextRegno} />
          <Button type="submit">Go</Button>
        </form>
      </div>
    )
  }
}

const validate = (formValues, props) => {

  const errors = {};

  console.log(formValues, props);

  if (!formValues.regno) {
    errors.regno = "Information should be entered";
  }

  return errors;
}




StudentForm = reduxForm({
  // a unique name for the form
  form: 'student',
  validate: validate
})(StudentForm)

export default StudentForm;