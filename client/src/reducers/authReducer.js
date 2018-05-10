// lowercase because we're not exporting a component, we're planning to export a function.

// state = {} initializes state to an empty object instead of undefined. Will change in future.
export default function(state = {}, action) {
 
  console.log(action);
  switch(action.type) {
    default:
      return state;
  }
}