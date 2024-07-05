import express, { json } from 'express';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

config();

const app = express();
const port = process.env.PORT || 3000;
const users = [];

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in .env');
}

app.use(json());

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    validateEmailOrFail(email, res);
    validatePasswordOrFail(password, res);

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).send('Email is already registered.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    validateEmailOrFail(email, res);

    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(400).send('User not found.');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send('Incorrect password.');
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = sign({ email: user.email }, jwtSecretKey, { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateEmailOrFail = (email, res) => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format.');
  }
};

const validatePasswordOrFail = (password, res) => {
  if (!validatePassword(password)) {
    throw new Error('Password must be at least 6 characters long.');
  }
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
