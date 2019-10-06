/* eslint-disable no-else-return */
import React from 'react';

const Gameboard = props => {
  const { board } = props;
  if (!board) {
    return null;
  } else {
    return (
      <div className="text-center" id="board_container">
        <div id="board">
          {board.map(letter => (
            <span> {letter} </span>
          ))}
        </div>
      </div>
    );
  }
};

export default Gameboard;
