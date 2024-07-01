const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// 1. Endpoint that returns text (no matter what)
app.get('/return-text', (req, res) => {
  res.send('This is a text response.');
});

// 2. Endpoint that accepts query parameters
app.get('/query-params', (req, res) => {
  const params = req.query;
  res.send(`Received query parameters: ${JSON.stringify(params)}`);
});

// 3. Endpoint that adds 2 numbers (the 2 numbers are query parameters)
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const sum = num1 + num2;
  res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

// 4. Endpoint that uses POST method
app.post('/post-text', (req, res) => {
  res.send('This is a text response from a POST request.');
});

// 5. Endpoint that uses the POST method (console.log retrieve the entire body of the query)
app.post('/log-body', (req, res) => {
  console.log(req.body);
  res.send('Logged the body to the console.');
});

// 6. Endpoint that uses the POST method (sum 2 numbers (from the request body) and return the result)
app.post('/sum-body', (req, res) => {
  const { num1, num2 } = req.body;
  const sum = num1 + num2;
  res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

// 7. Endpoint that uses a GET method to return some file
app.get ('/get-file', (req, res) => {
  res.sendFile(__dirname + '/sample2.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
