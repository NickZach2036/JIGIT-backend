import express from 'express';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import { createUser, dropTable, deleteUser, syncDatabase } from './utils/user-utils.js';
import { body, validationResult } from 'express-validator';

config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server is up and running on ${port} ...`);
  await syncDatabase();
});

app.post('/user/generateToken', (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const token = sign({ email }, jwtSecretKey);
  res.send(token);
});

app.post('/user/create', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const newUser = await createUser(email, password);
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

app.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

app.post('/user/dropTable', async (req, res) => {
  try {
    await dropTable();
    res.status(200).json({ message: 'Table dropped successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error dropping table', error });
  }
});
