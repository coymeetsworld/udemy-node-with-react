// header, for now. Will refactor later
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {

  // Refactoring: Don't need return statement or curly brackets if there is only one return statement

  //applyMiddleware will see that we are returning a function from the action creator.
  // redux-thunk will automatically call the function, and pass the dispatch function as an argument.
  //
  // Were doing this so that we don't dispatch an action until the API request is completed, thats the whole point of this.

  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res});
  
  /*
  Under package.json, setup this proxy for ALL api calls.
    "/api/*": {
    "target": "http://localhost:5000"
  }*/
};
  

// redux thunk notes:
// React component calls an action creator and produces an action.
// The dispatch function sends the action to all the different reducers in the store,
//   causing them all to instantly recalculate the app state
// redux thunk is giving us direct access to Dispatch Function. So we don't need to send an action, we can just manually dispatch actions (allows us to bend the rules of the redux workflow)
