import React from 'react';


//export default (props) => {
// takes in props, ES6 destructuring takes the input property and assigns it to a local variable named input.
// meta is 3rd property, were ES6 destructuring
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px'}}/>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error }
      </div>
    </div>
  );
};