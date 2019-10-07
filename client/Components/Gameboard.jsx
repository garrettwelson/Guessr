/* eslint-disable no-else-return */
import React from 'react';
import Row from 'react-bootstrap/Row';

const Gameboard = props => {
  const {
    board,
    currentGuess,
    addGuess,
    submitGuess,
    gameOver,
    victory,
    target,
    attemptedLetters
  } = props;
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
      <>
        <Row>
          <div id="board_container" className="mx-auto spacer">
            <div id="board">
              {board.map((letter, i) => (
                <span key={i}> {letter} </span>
              ))}
            </div>
            <div className="break" />
            <div>
              <input
                id="guessInput"
                type="text"
                value={currentGuess}
                onChange={addGuess}
                onKeyDown={submitGuess}
                placeholder="Guess"
              />
            </div>
          </div>
        </Row>
        <Row>
          <div id="board_container" className="mx-auto">
            {attemptedLetters.length > 0 ? (
              <p>Attempted Letters: {attemptedLetters.join(' , ')}</p>
            ) : null}
          </div>
        </Row>
      </>
    );
  }
};

export default Gameboard;
