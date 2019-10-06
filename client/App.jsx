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
      board: [],
      attemptedLetters: [],
      prefs: {
        count: 1,
        difficulty: 2,
        start: 0
      },
      leaderData: []
    };
    this.prepBoard = this.prepBoard.bind(this);
  }

  componentDidMount() {
    const { prefs } = this.state;
    axios
      .get(`/words?count=${prefs.count}&difficulty=${prefs.difficulty}&start=${prefs.start}`)
      .then(result => {
        console.log('word is:', result.data);
        this.setState({ target: result.data }, this.prepBoard(result.data));
      });
  }

  prepBoard(target) {
    console.log(target);
    this.setState({
      board: target.split('').map(() => '?')
    });
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
