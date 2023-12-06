// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Omkar1234',
  database: 'coal_mine',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to handle login data
app.post('/api/login', (req, res) => {
  const { user, pwd } = req.body;

  // Validate data (you might want to add more validation)
  if ( !pwd || !user) {
    return res.status(400).json({ message: 'All fields are mandatory' });
  }

  // Save data to the database
  const sql = 'INSERT INTO mine_master (Mine_username, Password) VALUES (?, ?)';
  connection.query(sql, [user, pwd], (error, results) => {
    if (error) {
      console.error('Error saving user to MySQL:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json({ message: 'User registered successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
