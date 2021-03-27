const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

const port = 3000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

//routes
const userRouter = require('./routes/users');
const tagRouter = require('./routes/tags');
const snippetRouter = require('./routes/snippets');
const authRouter = require('./routes/auth');

app.use(express.json());

app.use('/users', userRouter);
app.use('/tags', tagsRouter);
app.use('/snippets', snippetsRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get('/',  (req, res) => {
  res.send("hello world");
})