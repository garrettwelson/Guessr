import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>
          Hello, world! I'm Garrett
          <span role="img" aria-label="100 Emoji and face with sunglasses emoji">
            💯😎
          </span>
        </h1>
        <p>Hello again, testing!</p>
      </div>
    );
  }
}

export default App;
