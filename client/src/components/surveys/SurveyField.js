import React from 'react';


//export default (props) => {
// takes in props, ES6 destructuring takes the input property and assigns it to a local variable named input.
export default ({ input, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};