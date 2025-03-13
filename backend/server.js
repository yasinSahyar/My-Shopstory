const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path'); // path modülünü ekliyoruz

const app = express();
app.use(express.json());
app.use(cors());

// Statik dosyaları servis etmek için public dizinini ekliyoruz
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Dimayman1', // Replace with your MySQL password
  database: 'shopstory_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key

// Register Endpoint
app.post('/api/register', (req, res) => {
  const { full_name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [full_name, email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Error registering user' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error logging in' });
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
});

// Contact Us Endpoint 
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Mesaj gönderme hatası:', err);
      return res.status(500).json({ message: 'Error sending message' });
    }
    res.status(201).json({ message: 'Message sent successfully' });
  });
});

// User Endpoint
app.get('/api/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    const sql = 'SELECT full_name, email FROM users WHERE id = ?';
    db.query(sql, [decoded.id], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching user' });
      if (results.length === 0) return res.status(404).json({ message: 'User not found' });
      res.json(results[0]);
    });
  });
});

// Tüm istemci rotalarını index.html'e yönlendirme
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));