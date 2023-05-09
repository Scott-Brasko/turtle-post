const express = require('express');
const cors = require("cors");
const app = express();

const PORT = 3000;

app.use(cors())

app.get('/test', (req, res) => {
  res.status(200).send('test send');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});