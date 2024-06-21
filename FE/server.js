// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.post('/signup', (req, res) => {
  const { nama, email, password } = req.body;
  const sql = 'INSERT INTO users (nama, email, password) VALUES ("", "", "")';
  db.query(sql, [nama, email, password], (err, result) => {
    if (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User signed up:', result.insertId);
      res.json({ message: 'Signup successful' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
