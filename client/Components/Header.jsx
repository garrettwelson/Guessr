import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Header = props => {
  const { showPrefs, handlePrefsModal, username, difficulty, handlePrefsInput } = props;
  return (
    <Row>
      <div className="text-center mx-auto">
        <h1>Guessr</h1>
        <div id="instructions">
          Simply type in a letter into the "Guess" input box below. Watch out! You only get six
          strikes, and then it's game over!
        </div>
        <Button variant="outline-primary" onClick={handlePrefsModal}>
          Preferences
        </Button>
        <Modal show={showPrefs} onHide={handlePrefsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Preferences</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Use the following fields to adjust word preferences</p>
            <Form.Control
              as="input"
              value={username}
              name="username"
              placeholder="username"
              onChange={handlePrefsInput}
            />
            <p>Select a difficulty from 1-10</p>
            <Form.Control
              as="select"
              onChange={handlePrefsInput}
              name="difficulty"
              value={difficulty}
              placeholder="difficulty"
            >
              {Array.from(new Array(10), (x, i) => i + 1).map(val => (
                <option value={val} key={val}>
                  {val}
                </option>
              ))}
            </Form.Control>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePrefsModal}>
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
