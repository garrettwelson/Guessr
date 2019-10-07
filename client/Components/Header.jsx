import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

const Header = props => (
  <Row>
    <div className="text-center mx-auto">
      <h1>Guessr</h1>
      <div id="instructions">
        Simply type in a letter into the "Guess" input box below. Watch out! You only get six
        strikes, and then it's game over!
      </div>
    </div>
  </Row>
);

export default Header;
