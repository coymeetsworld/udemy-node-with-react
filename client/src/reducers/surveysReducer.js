import { FETCH_SURVEYS } from '../actions/types';

// initialize state to empty array so on view it shows no list (as opposed to undefined?)
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }  
}