// used to automatically import the reducers

import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'; // can't change name of reducer
import authReducer from './authReducer';

// auth is a key name made by us, could be anything.
export default combineReducers({
  auth: authReducer,
  form: reduxForm // need to call it form, thats what redux-form expects. Read Redux Form doc on how to change key, if necessary.
});