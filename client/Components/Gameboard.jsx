/* eslint-disable no-else-return */
import React from 'react';

const Gameboard = props => {
  const { board, currentGuess, addGuess, submitGuess, gameOver, victory, target } = props;
  if (!board) {
    return null;
  } else if (gameOver && victory) {
    return (
      <div id="board_container">
        <h4>Congrats, you won!</h4>
      </div>
    );
  } else if (gameOver && !victory) {
    return (
      <div id="board_container">
        <h4>Too bad! You lost. The word was: "{target}"</h4>
      </div>
    );
  } else {
    return (
      <div id="board_container">
        <div id="board">
          {board.map((letter, i) => (
            <span key={i}> {letter} </span>
          ))}
        </div>
        <div id="break" />
        <div id="guessInput">
          <input
            type="text"
            value={currentGuess}
            onChange={addGuess}
            onKeyDown={submitGuess}
            placeholder="Guess"
          />
        </div>
      </div>
    );
  }
};

export default Gameboard;
