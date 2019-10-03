import React from 'react';

const Header = props => (
  <div className="text-center">
    <h1>Guessr</h1>
    <div id="instructions">
      Simply type in a letter into the "Guess" input box below. Watch out! You only get six strikes,
      and then it's game over!
    </div>
  </div>
);

export default Header;
