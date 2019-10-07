import React from 'react';
import Row from 'react-bootstrap/Row';

const Strikes = props => {
  const { currentStreak, maxStreak, username } = props;

  return (
    <Row>
      <div className="text-center mx-auto spacer">
        {username ? <h5>Welcome back, {username}!</h5> : null}
        <h5>Your current streak is: {currentStreak}</h5>
        <h5>Your maximum streak is: {maxStreak}</h5>
      </div>
    </Row>
  );
};

export default Strikes;
