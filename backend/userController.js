const { connect } = require('./db');

async function signup(req, res) {
  try {
    const db = await connect();
    const users = db.collection('Users');
    const { username, password } = req.body;

    // check if username exists
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // store new user
    const result = await users.insertOne({ username, password });
    res.status(201).json({ message: 'Signup successful', userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const db = await connect();
    const users = db.collection('Users');
    const { username, password } = req.body;

    const user = await users.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { signup, login };
