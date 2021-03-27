const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 3000;


//routes
const testRouter = require('./routes/test');

app.use('/test', testRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get('/',  (req, res) => {
  res.send("hello world");
})