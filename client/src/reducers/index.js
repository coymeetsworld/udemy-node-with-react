// used to automatically import the reducers

import { combineReducers } from 'redux';
import authReducer from './authReducer';

// auth is a key name made by us, could be anything.
export default combineReducers({
  auth: authReducer 
});