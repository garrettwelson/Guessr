# Guessr

### Deployed at [guessr.welson.co](http://guessr.welson.co)

### React-based implementation of the classic "hangman" word game

This simple web game gets a random word from an external API, allows the user to input letters to guess the word, and tracks the user's winning streak (both current and longest). After 6 missed guesses for a given word, the user's streak will reset and they'll see the correct answer. The user can add a username and track their difficulty preferences. 

### Included technologies

* React
* Node/Express
* Bootstrap for styling (using the React Bootstrap component library)
* Cookie-Session middleware
* Babel
* Webpack
* Prettier/ESLint (using the AirBnb style guide)

### Instructions

* **Option 1 - Accessing deployed version:** Go to [guessr.welson.co](http://guessr.welson.co). Note that the app uses local cookies to store a small amount of session data, so this should persist within any given browser on any given device
* **Option 2 - Building locally:** 

1. Clone this repo
2. Type `npm install` to install required dependencies (ensure you have an up-to-date version of Node and npm)
3. Type `npm run webpack build` to build the latest production bundle from the files in client
4. Type `npm start` to begin server. It should default to port **8080** on local host instances, so access in the browser using `localhost:8080`

### Challenges Faced and Lessons Learned

1. **Adjusting color based on moves left:** I wanted the shape around the number of moves left to gradually transition from green to red as the user reaches the end of their possible moves. I had never conditionally adjusted CSS for a pure CSS stylesheet (I had done it with certain CSS-in-JS frameworks like Sass). I learned how to set variables on the `:root` element in CSS and how to to programmatically update them with Javascript. Using the code `document.documentElement.style.setProperty('--variable-name', newValue);`, it is possible to change CSS variables easily within React app methods.
2. **Handling single-letter input:** I wanted the letter guessing input to be a smooth and simple user experience, so typing seemed like a much more natural choice than using a select menu. I wanted to limit the field to one letter at a time. The `max-length` property on inputs in HTML and JSX could accomplish this limitation, but rather than overwriting the current value when a new letter was entered, it would simply block subsequent input until the user deleted their current input. I implemented some form control logic in my React event handler to achieve my desired effect.
3. **Deployment:** While the focus of this project was not on deployment, I decided it could be a valuable opportunity to learn a new deployment approach. I had previous experience deploying apps to AWS using Docker and Elastic Beanstalk, and I worked on a team project that deployed to an Amazon EC2 instance. For this project, I initially considered the Google Firebase service but realized it was optimized for serving up front ends without a robust backend like I had built using Node and Express. I then turned my focus to Heroku and learned how to deploy full-stack Node apps to it using their CLI.
4. **Storing win streak and session data:** I wanted a straightforward and secure way to store basic session information including difficulty preference, username, and win streak data. A hosted database such as Heroku's version of Postgres or Mongo Atlas would have worked, but this would have added potential concerns around security and authentication. Given the low-stakes nature of this data, locally-stored session cookies provided a straightforward approach through the Express `cookie-session` middleware, which was a new technology to me and was fun to implement

### Planned Next Steps

Given more time, I would aim to implement the following functionality, which goes beyond the scope of the exercise, but would make this more of a production-grade web app:

1. Implement a hosted database through Heroku or Mongo Atlas
2. Implement secure authentication using an external service such as OAuth or Auth0
3. Refactor cookie session system to only store a session UUID in cookies and store all streak data and preferences in database
4. Show a leaderboard of all users based on top streak data from the database
5. Filter and segment streak data based on difficulty level (a 10-game streak at maximum difficulty is different than a 10-game streak at the lowest difficulty)
