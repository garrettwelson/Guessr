import React from 'react';
import Header from './Components/Header.jsx';
import Row from 'react-bootstrap/Row';
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
      gameOver: false,
      victory: false,
      showPrefs: false,
      leaderData: []
    };
    this.addGuess = this.addGuess.bind(this);
    this.changeHexColor = this.changeHexColor.bind(this);
    this.handlePrefs = this.handlePrefs.bind(this);
    this.prepBoard = this.prepBoard.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
  }

  componentDidMount() {
    const { prefs } = this.state;
    axios
      .get(`/words?count=${prefs.count}&difficulty=${prefs.difficulty}&start=${prefs.start}`)
      .then(result => {
        console.log('word is:', result.data);
        this.setState({ target: result.data.toLowerCase() }, this.prepBoard(result.data));
      });
  }

  addGuess(event) {
    let letter;
    // this ensures only one letter is allowed in the input at any given time
    if (event.target.value.length > 1) {
      letter = event.target.value.slice(-1);
    } else {
      letter = event.target.value;
    }
    this.setState({
      currentGuess: letter.toLowerCase()
    });
  }

  changeHexColor() {
    const colors = {
      6: '#2ECC40',
      5: '#01FF70',
      4: '#ADFF2F',
      3: '#FFDC00',
      2: '#FF851B',
      1: '#FF4136'
    };
    const { guesses } = this.state;
    document.documentElement.style.setProperty('--hex-fill', colors[guesses]);
  }

  handlePrefs() {
    let { showPrefs } = this.state;
    this.setState({
      showPrefs: !showPrefs
    });
  }

  prepBoard(target) {
    console.log(target);
    this.setState({
      board: target.split('').map(() => '?')
    });
  }

  submitGuess(event) {
    const { target, board, attemptedLetters, currentGuess } = this.state;
    let { guesses } = this.state;
    const checkBoard = () => {
      // do nothing if no input for guess (handles accidental enter presses)
      if (currentGuess === '') {
        return;
      }

      // return a message and reset current guess if that letter has been tried already
      if (attemptedLetters.includes(currentGuess)) {
        this.setState({
          currentGuess: ''
        });
        return;
      }

      // return a message, decrease remaining guesses, and reset current guess if letter not in target
      if (!target.includes(currentGuess)) {
        if (guesses === 1) {
          this.setState(
            {
              gameOver: true,
              victory: false,
              guesses: (guesses -= 1),
              currentGuess: '',
              board: [],
              attemptedLetters: []
            },
            this.changeHexColor()
          );
        } else {
          this.setState(
            {
              guesses: (guesses -= 1),
              currentGuess: '',
              attemptedLetters: [...attemptedLetters, currentGuess]
            },
            this.changeHexColor()
          );
          return;
        }
      }

      // Assuming all other conditionals fail, generate new board with the matching letter
      let newBoard = board.map((letter, i) => {
        if (letter === '?' && target[i] === currentGuess) {
          return target[i];
        }
        return letter;
      });
      // if board is complete and matches target
      if (newBoard.join('') === target) {
        this.setState({
          gameOver: true,
          victory: true,
          target: '',
          guesses: 6,
          currentGuess: '',
          board: [],
          attemptedLetters: []
        });
      } else {
        this.setState({
          board: newBoard,
          attemptedLetters: [...attemptedLetters, currentGuess],
          currentGuess: ''
        });
      }
    };

    if (event.key === 'Enter') {
      console.log('enter pressed');
      checkBoard();
    }
  }

  render() {
    const {
      guesses,
      board,
      currentGuess,
      gameOver,
      victory,
      target,
      attemptedLetters,
      showPrefs
    } = this.state;
    return (
      <Container>
        <Header showPrefs={showPrefs} handlePrefs={this.handlePrefs} />
        <Strikes guesses={guesses} />
        <Gameboard
          board={board}
          currentGuess={currentGuess}
          addGuess={this.addGuess}
          submitGuess={this.submitGuess}
          gameOver={gameOver}
          victory={victory}
          target={target}
          attemptedLetters={attemptedLetters}
        />
      </Container>
    );
  }
}

export default App;
