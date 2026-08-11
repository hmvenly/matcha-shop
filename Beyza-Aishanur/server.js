const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./coffee.db', (err) => {
    if (err) console.error('Database connection error:', err);
    else console.log('Connected to coffee.db');
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )
`);

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (username, password_hash) VALUES (?, ?)`,
            [username, hashedPassword],
            function (err) {
                if (err) {
                    return res.status(400).json({ error: "That ID is already taken!" });
                }
                res.status(201).json({ message: "User registered successfully!" });
            }
        );
    } catch (err) {
        res.status(500).json({ error: "Server error during registration" });
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }

    db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        async (err, user) => {
            if (err) {
                return res.status(500).json({ error: "Database query error" });
            }

            if (!user) {
                return res.status(401).json({ error: "Invalid ID or Password!" });
            }

            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (isMatch) {
                return res.status(200).json({ message: "Login successful!" });
            } else {
                return res.status(401).json({ error: "Invalid ID or Password!" });
            }
        }
    );
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});