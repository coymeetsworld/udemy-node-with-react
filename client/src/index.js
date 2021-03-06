// Data layer control (redux)

// webpack assumes an npm module for a relative path
// don't need to give it a name, i.e. import MaterializeCSS from '/path/to/css';
import 'materialize-css/dist/css/materialize.min.css'; // have to include extension since it's not a JS file

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import reducers from './reducers';

// Redux notes
// Provider is a component that makes the store accessible to every component in the app.
// Components like SurveyList can access the store thanks to the Provider tag
// Provider is the bonding glue between React and Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// temporary test code, uncomment if you want to use it for testing.
// on browser terminal: const survey = { title: 'My title', subject: 'my subject', recipients: 'someemail@gmail.com', body: "here's the body of the email"}
// on browser terminal: axios.post(/api/surveys', survey);
//import axios from 'axios';
//window.axios = axios;


// first argument dummy function
// second argument initial state. We don't care so we make it empty object.
// third argument for Redux-thunk (later)
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// 2nd argument is a reference to an existing DOM node in our HTML (public/index.html).
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.querySelector('#root')
);

