import React from 'react';

const Strikes = props => {
  const { guesses, visibleMessage, message, attemptedLetters } = props;

  return (
    <div className="text-center">
      <span>{guesses}</span>
      <p>Guesses left</p>
      {visibleMessage ? <p>{message}</p> : null}
      {attemptedLetters.length > 0 ? (
        <p>Attempted Letters: {attemptedLetters.join(' , ')}</p>
      ) : null}
    </div>
  );
};

export default Strikes;
