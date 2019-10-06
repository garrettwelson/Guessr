import React from 'react';

const Strikes = props => {
  const { guesses, visibleMessage, message } = props;

  return (
    <div className="text-center">
      <span>{guesses}</span>
      <p>Guesses left</p>
      {visibleMessage ? <p>{message}</p> : null}
    </div>
  );
};

export default Strikes;
