import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions'; // this gets wired in the connect function below, which gets the submitSurvey function for the submit button.

// es6 destructure onCancel prop off
const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {

  const reviewFields = _.map(formFields, ({name, label}) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    )
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button className="green btn-flat white-text right" onClick={() => submitSurvey(formValues)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

// name mapStateToProps isn't important, just a standard
function mapStateToProps(state) {
  //console.log(state.form.surveyForm.values); //surveyForm name defined on SurveyForm.js (see code below:)
  /*export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false // means if this form is not currently rendered on the screen, the form isn't destroyed. This is how we persist the values when we change views (i.e. SurveyForm -> SurveyFormReview -> SurveyForm by hitting back)
  })(SurveyForm);*/
  
  return {
    formValues: state.form.surveyForm.values
  };
}

// use connect helper to reach into redux store and pull out form values.
export default connect(mapStateToProps, actions)(SurveyFormReview);
