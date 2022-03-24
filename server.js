const express = require('express');
const app = express();


const redisClient = require('./redis-client');

app.get('/store/:key', async (req, res) => {
  const { key } = req.params;
  const value = req.query;
  const date = new Date();
  const buy = {...value, date: date.toLocaleDateString("en-US")};
  await redisClient.setAsync(key, JSON.stringify(buy));
  return res.send('Success');
});

app.get('/:key', async (req, res) => {
  const { key } = req.params;
  const rawData = await redisClient.getAsync(key);
  return res.json(JSON.parse(rawData));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
