/* eslint-disable no-else-return */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Gameboard = props => {
  const {
    board,
    currentGuess,
    addGuess,
    submitGuess,
    gameOver,
    victory,
    target,
    attemptedLetters,
    getData
  } = props;

  if (!board) {
    return null;
  } else if (gameOver && victory) {
    return (
      <>
        <div id="board_container">
          <h4>Congrats, you won!</h4>
        </div>
        <div id="board_container">
          <Button variant="outline-primary" onClick={getData} id="newGame">
            Start new game
          </Button>
        </div>
      </>
    );
  } else if (gameOver && !victory) {
    return (
      <>
        <div id="board_container">
          <h4>Too bad! You lost. The word was: "{target}"</h4>
        </div>
        <div id="board_container">
          <Button variant="outline-primary" onClick={getData} id="newGame">
            Start new game
          </Button>
        </div>
      </>
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
                className="userInput"
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
