// lowercase because we're not exporting a component, we're planning to export a function.
import { FETCH_USER } from '../actions/types';

// state = null for FETCH_USER, if its null we don't know if the user is logged in or not.
export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false; // false returns if no user is logged in, API call will return an empty string, which is falsy.
    default:
      return state;
  }
}