// Data layer control (redux)

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

// first argument dummy function
// second argument initial state. We don't care so we make it empty object.
// third argument for Redux-thunk (later)
const store = createStore(reducers, {}, applyMiddleware());

// 2nd argument is a reference to an existing DOM node in our HTML (public/index.html).
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.querySelector('#root')
);

