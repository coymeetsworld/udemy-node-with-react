import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // similar to connect method, has same signature below:
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

  renderFields() {
      /*<div>
        <Field label="Survey Title" type="text" name="title" component={SurveyField} />
        <Field label="Subject" type="text" name="subject" component={SurveyField} />
        <Field label="Email Body" type="text" name="body" component={SurveyField} />
        <Field label="Recipient List" type="text" name="emails" component={SurveyField} />
      </div>*/
    return _.map(formFields, ({name, label}) => {
      return <Field key={name} component={SurveyField} type="text" name={name} label={label} />
    })
  }

  // <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
  // no parenthesis after onSurveySubmit because we don't want to run it until form is submitted. Don't want to invoke yet.
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
          <button type="submit" className="teal btn-flat right white-text">Next <i className="material-icons right">done</i></button>
        </form>
      </div>
    );
  }
}


// values are all the values that come from the form, in this case; title, subject, body, and emails.
function validate(values) {
  const errors = {}; 

  // redux-form automatically matches the error to the instance of the Field with the same name. values.name, values.subject, values.body, values.emails
  _.each(formFields, ({name}) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  errors.recipients = validateEmails(values.recipients || ''); //validate runs right away, before emails are added.

  return errors; // if empty, redux-form assumes everything is ok. If not, will assume the form is invalid.
}

// form is the only required property that needs to be defined in the object.
// can also pass in a validate property
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false // means if this form is not currently rendered on the screen, the form isn't destroyed. This is how we persist the values when we change views (i.e. SurveyForm -> SurveyFormReview -> SurveyForm by hitting back)
})(SurveyForm);


