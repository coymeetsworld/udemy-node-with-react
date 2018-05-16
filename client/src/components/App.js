// Rendering layer control (React Router)

import React, { Component} from 'react';

// BrowserRouter - the brains, tells react-router how to behave. Looks at URL and says what to display
// Route - to set a rule between URL and component
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';


//dummy component (for now)
const SurveyNew = () => <h2>SurveyNew</h2>


// BrowserRouter expects AT MOST one child
// exact in route means find exact route, not regex for the route.

// When we first boot up, we want to make an API request to see if user is logged in
//  we will use an app request we created in authRoutes.js (app.get('/api/current_user'))
class App extends Component {

  // componentWillMount in future React versions may get called many times, so componentDidMount is preferred function for API calls
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/surveys" component={Dashboard}/>
            <Route path="/surveys/new" component={SurveyNew}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

// first argument is mapStateToProps, which we're not going to use here so its null.
// second is actions we want to wire up
export default connect(null, actions)(App);