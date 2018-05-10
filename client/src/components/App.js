// Rendering layer control (React Router)

import React from 'react';

// BrowserRouter - the brains, tells react-router how to behave. Looks at URL and says what to display
// Route - to set a rule between URL and component
import { BrowserRouter, Route} from 'react-router-dom';

//dummy component (for now)
const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>


// BrowserRouter expects AT MOST one child
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" component={Landing}/>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;