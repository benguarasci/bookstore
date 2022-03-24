const express = require('express');
const path = require('path');
const app = express();


const redisClient = require('./redis-client');

app.get('/buy/book', async (req, res) => {
  const info = req.query;
  const date = new Date();
  const book = {...info, date: date.toLocaleDateString("en-US")};
  await redisClient.setAsync(key, JSON.stringify(book));
  return res.send('Success');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
