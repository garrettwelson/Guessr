import React from 'react';

const Header = props => (
  <div className="text-center">
    <h1>Guessr</h1>
    <div id="instructions">
      Simply type in a letter into the "Guess" input box below. If you letter is in the word, you'll
      see it appear in the blanks If it's not, you'll get a strike Watch out! You only get six
      strikes, and then it's game over!
    </div>
  </div>
);

export default Header;
