import React from 'react';
import Header from './Components/Header.jsx';
import Strikes from './Components/Strikes.jsx';
import Gameboard from './Components/Gameboard.jsx';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: '',
      guesses: 6,
      currentGuess: '',
      board: ['_', '_', '_', '_', '_'],
      attemptedLetters: [],
      prefs: {
        count: 1,
        difficulty: 2,
        start: 0
      },
      leaderData: []
    };
  }

  componentDidMount() {
    const { prefs } = this.state;
    axios
      .get(`/words?count=${prefs.count}&difficulty=${prefs.difficulty}&start=${prefs.start}`)
      .then(result => console.log('result is:', result.data));
    // const requestConfig = {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers: {
    //     Access-Control-Allow-Origin: *
    //   }
    // };
    // fetch(
    //   `http://app.linkedin-reach.io/words?count=${prefs.count}&difficulty=${prefs.difficulty}&start=${prefs.start}`,
    //   requestConfig
    // )
    //   .then(res => res.text())
    //   .then(text => console.log(text));
  }

  render() {
    const { guesses, board, currentGuess, leaderData } = this.state;
    return (
      <Container fluid>
        <Header />
        <Strikes guesses={guesses} />
        <Gameboard board={board} currentGuess={currentGuess} />
      </Container>
    );
  }
}

export default App;
