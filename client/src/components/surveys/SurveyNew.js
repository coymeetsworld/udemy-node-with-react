import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

  /*Instead of this:
  constructor(props) {
    super(props);

    this.state = { new: true };
  }*/
  state = { showFormReview: false }; // shortcut, this line is equivalent to above.

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview
        onCancel={() => this.setState({ showFormReview: false})} 
      />;
    }
    return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})} />;
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);