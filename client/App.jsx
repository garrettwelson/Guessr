import React from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import Container from 'react-bootstrap/Container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid>
        <Header />
      </Container>
    );
  }
}

export default App;
