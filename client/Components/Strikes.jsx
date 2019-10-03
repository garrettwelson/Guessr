import React from 'react';

const Strikes = props => (
  <div className="text-center">
    <span>{props.guesses}</span>
    <p>Guesses left</p>
  </div>
);

export default Strikes;
