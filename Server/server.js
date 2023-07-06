const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { Console } = require('console');

const app = express();
//const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'Website'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Website', 'index.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read the credentials file
  const credentialsPath = path.join(__dirname, '..', 'Server', 'credentials.json');
  fs.readFile(credentialsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading credentials file:', err);
      res.sendStatus(500);
      return;
    }

    try {
      const credentials = JSON.parse(data);

      // Check if the username and password match the credentials in the JSON
      const matchedUser = credentials.users.find(user => user.username === username && user.password === password);

      if (matchedUser) {
        // Successful login, render the loggedin.ejs template with the username
        // res.render('loggedin', { username: matchedUser.username });
        res.redirect('/homepage');
        console.log("sucess");
      } else {
        // Invalid credentials, redirect back to login page
        res.redirect('/login');
      }
    } catch (error) {
      console.error('Error parsing credentials:', error);
      res.sendStatus(500);
    }
  });
});

app.get('/logged.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Website-Login', 'index-Login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Website-Regi', 'index-Regi.html'));
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Read the credentials file
  const credentialsPath = path.join(__dirname, '..', 'Server', 'credentials.json');
  fs.readFile(credentialsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading credentials file:', err);
      res.sendStatus(500);
      return;
    }

    try {
      const credentials = JSON.parse(data);

      // Check if the username already exists
      const userExists = credentials.users.some(user => user.username === username);
      if (userExists) {
        res.send('Username already exists. Please choose a different username.');
        return;
      }

      // Add the new user to the credentials
      credentials.users.push({ username, password });

      // Save the updated credentials to the file
      fs.writeFile(credentialsPath, JSON.stringify(credentials, null, 2), err => {
        if (err) {
          console.error('Error writing credentials file:', err);
          res.sendStatus(500);
        } else {
          res.send('Registration successful. You can now login with your new account.');
        }
      });
    } catch (error) {
      console.error('Error parsing credentials:', error);
      res.sendStatus(500);
    }
  });
});

// Serve the index.html file
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../Website/index.html');
  res.sendFile(indexPath);
});

// html file
app.get('/about', (req, res) => {
  const aboutPath = path.join(__dirname, '../Website-About/index-About.html');
  res.sendFile(aboutPath);
});
app.get('/home', (req, res) => {
  const aboutPath = path.join(__dirname, '../Website/index.html');
  res.sendFile(aboutPath);
});


// Games

app.get('/tictactoe', (req, res) => {
  const aboutPath = path.join(__dirname, '../Website-TicTacToe/tic-tac-toe(3)/index-Tic3.html');
  res.sendFile(aboutPath);
});
app.get('/tictactoe4', (req, res) => {
  const aboutPath = path.join(__dirname, '../Website-TicTacToe/tic-tac-toe(4)/index-Tic4.html');
  res.sendFile(aboutPath);
});
app.get('/tictactoe5', (req, res) => {
  const aboutPath = path.join(__dirname, '../Website-TicTacToe/tic-tac-toe(5)/index-Tic5.html');
  res.sendFile(aboutPath);
});

app.get('/make24', (req, res) => {
  const aboutPath = path.join(__dirname, '../Make24/index-Make24.html');
  res.sendFile(aboutPath);
});
app.get('/coinflip', (req, res) => {
  const aboutPath = path.join(__dirname, '../Coinflip/index-Coinflip.html');
  res.sendFile(aboutPath);
});
app.get('/login', (req, res) => {
  const aboutPath = path.join(__dirname, '../Website-Login/index-Login.html');
  res.sendFile(aboutPath);
});
app.get('/register', (req, res) => {
  const aboutPath = path.join(__dirname, '../Website-Regi/index-Regi.html');
  res.sendFile(aboutPath);
});

app.get('/homepage', (req, res) => {
  const aboutPath = path.join(__dirname, '../Website-AfterRegi/index-AfterRegi.html');
  res.sendFile(aboutPath);
});

app.get('/highscore', (req, res) => {
  const aboutPath = path.join(__dirname, 'highscore.json');
  res.sendFile(aboutPath);
});

// image files
app.use('/images/tictactoe', express.static(path.join(__dirname, '../images/tictactoe.png')));
app.use('/images/make24', express.static(path.join(__dirname, '../images/make24.png')));
app.use('/images/coinflip', express.static(path.join(__dirname, '../images/Coinflip.jpg')));

app.use('/images/heads', express.static(path.join(__dirname, '../images/heads.svg')));
app.use('/images/tails', express.static(path.join(__dirname, '../images/tails.svg')));

app.use('/images/eye-slash', express.static(path.join(__dirname, '../images/eye-slash-solid.svg')));
app.use('/images/eye', express.static(path.join(__dirname, '../images/eye-solid.svg')));

app.use('/images/email', express.static(path.join(__dirname, '../images/email.png')));

// Handle unknown URLs with a 404 error
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

const port = 3001;
app.listen(port, () => {
  console.log(`\nServer running on http://0.0.0.0:${port}\n`);
});
