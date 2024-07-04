import express from 'express';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';

const app = express();

config();

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

app.post('/user/generateToken', (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  let data = {
    name: 'John Doe',
  };

  const token = sign(data, jwtSecretKey);

  res.send(token);
});

let test;