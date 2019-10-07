# Guessr

### React-based implementation of the classic "hangman" word game

This simple web game gets a random word from an external API, allows the user to input letters to guess the word, and tracks the user's winning streak (both current and longest). After 6 missed guesses for a given word, the user's streak will reset and they'll see the correct answer. The user can add a username and track their difficulty preferences. 

#### Included technologies

* React
* Node/Express
* Bootstrap for styling (using the React Bootstrap component library)
* Cookie-Session middleware
* Babel
* Webpack
* Prettier/ESLint (using the AirBnb style guide)

#### Challenges Faced and Lessons Learned

1. **Adjusting color based on moves left:** I wanted the shape around the number of moves left to gradually transition from green to red as the user reaches the end of their possible moves. I had never conditionally adjusted CSS for a pure CSS stylesheet (I had done it with certain CSS-in-JS frameworks like Sass). I learned how to set variables on the `:root` element in CSS and how to to programmatically update them with Javascript. Using the code `document.documentElement.style.setProperty('--variable-name', newValue);`, it is possible to change CSS variables easily within React app methods.
2. **Handling single-letter input:** I wanted the letter guessing input to be a smooth and simple user experience, so typing seemed like a much more natural choice than using a select menu. I wanted to limit the field to one letter at a time. The `max-length` property on inputs in HTML and JSX could accomplish this limitation, but rather than overwriting the current value when a new letter was entered, it would simply block subsequent input until the user deleted their current input. I implemented some form control logic in my React event handler to achieve my desired effect.
3. **Deployment:** While the focus of this project was not on deployment, I decided it could be a valuable opportunity to learn a new deployment approach. I had previous experience deploying apps to AWS using Docker and Elastic Beanstalk, and I worked on a team project that deployed to an Amazon EC2 instance. For this project, I initially considered the Google Firebase service but realized it was optimized for serving up front ends without a robust backend like I had built using Node and Express. I then turned my focus to Heroku and learned how to deploy full-stack Node apps to it using their CLI.
