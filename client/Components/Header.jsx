import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

const Header = props => {
  const { showPrefs, handlePrefs } = props;
  return (
    <Row>
      <div className="text-center mx-auto">
        <h1>Guessr</h1>
        <div id="instructions">
          Simply type in a letter into the "Guess" input box below. Watch out! You only get six
          strikes, and then it's game over!
        </div>
        <Button variant="outline-primary" onClick={handlePrefs}>
          Preferences
        </Button>
        <Modal show={showPrefs} onHide={handlePrefs}>
          <Modal.Header closeButton>
            <Modal.Title>Preferences</Modal.Title>
          </Modal.Header>
          <Modal.Body>Use the following drop-down items to adjust the word preferences</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePrefs}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="break" />
    </Row>
  );
};

export default Header;
