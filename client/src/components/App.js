// Rendering layer control (React Router)

import React from 'react';

// BrowserRouter - the brains, tells react-router how to behave. Looks at URL and says what to display
// Route - to set a rule between URL and component
import { BrowserRouter, Route} from 'react-router-dom';

import Header from './Header';


//dummy component (for now)
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>


// BrowserRouter expects AT MOST one child
// exact in route means find exact route, not regex for the route.

// When we first boot up, we want to make an API request to see if user is logged in
//  we will use an app request we created in authRoutes.js (app.get('/api/current_user'))
const App = () => {
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
};

export default App;