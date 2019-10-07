import React from 'react';
import Header from './Components/Header.jsx';
import Row from 'react-bootstrap/Row';
import Strikes from './Components/Strikes.jsx';
import Gameboard from './Components/Gameboard.jsx';
import Streaks from './Components/Streaks.jsx';
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
      gameOver: false,
      victory: false,
      showPrefs: false,
      currentStreak: 0,
      maxStreak: 0,
      username: '',
      difficulty: 3
    };
    this.getData = this.getData.bind(this);
    this.addGuess = this.addGuess.bind(this);
    this.changeHexColor = this.changeHexColor.bind(this);
    this.handlePrefsModal = this.handlePrefsModal.bind(this);
    this.handlePrefsInput = this.handlePrefsInput.bind(this);
    this.prepBoard = this.prepBoard.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get(`/words`)
      .then(result => {
        this.setState(
          {
            target: result.data.word.toLowerCase(),
            currentStreak: result.data.currentStreak,
            maxStreak: result.data.maxStreak,
            username: result.data.username,
            difficulty: result.data.difficulty,
            attemptedLetters: [],
            gameOver: false,
            victory: false
          },
          this.prepBoard(result.data.word)
        );
      })
      .then(() => {
        this.changeHexColor();
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
      1: '#FF4136',
      0: '#AAAAAA'
    };
    const { guesses } = this.state;
    document.documentElement.style.setProperty('--hex-fill', colors[guesses]);
  }

  handlePrefsInput(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }

    if (event.target.name === 'difficulty') {
      this.setState({ difficulty: event.target.value });
    }
  }

  handlePrefsModal() {
    const { showPrefs, username, difficulty } = this.state;
    if (showPrefs) {
      axios.put('/prefs', { username, difficulty });
    }
    this.setState({
      showPrefs: !showPrefs
    });
  }

  prepBoard(target) {
    this.setState({
      board: target.split('').map(() => '?'),
      guesses: 6
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
            () => {
              this.changeHexColor();
              axios.put('/streaks', { result: false });
            }
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
        this.setState(
          {
            gameOver: true,
            victory: true,
            target: '',
            currentGuess: '',
            board: [],
            attemptedLetters: []
          },
          () => {
            axios.put('/streaks', { result: true });
          }
        );
      } else {
        this.setState({
          board: newBoard,
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
      showPrefs,
      username,
      difficulty,
      currentStreak,
      maxStreak
    } = this.state;
    return (
      <Container>
        <Header
          showPrefs={showPrefs}
          handlePrefsModal={this.handlePrefsModal}
          handlePrefsInput={this.handlePrefsInput}
          username={username}
          difficulty={difficulty}
        />
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
          getData={this.getData}
        />
        <Streaks username={username} currentStreak={currentStreak} maxStreak={maxStreak} />
      </Container>
    );
  }
}

export default App;
