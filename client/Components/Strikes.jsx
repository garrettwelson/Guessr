import React from 'react';
import Row from 'react-bootstrap/Row';

const Strikes = props => {
  const { guesses } = props;

  return (
    <Row>
      <div className="text-center mx-auto">
        <div className="hexTop"></div>
        <div className="hexCenter">{guesses}</div>
        <div className="hexBottom"></div>
        <p>Guesses left</p>
      </div>
    </Row>
  );
};

export default Strikes;
