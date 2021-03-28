const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
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
const uploadRouter = require('./routes/upload');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(fileUpload());

app.use('/users', userRouter);
app.use('/tags', tagRouter);
app.use('/snippets', snippetRouter);
app.use('/auth', authRouter);
app.use('/upload', uploadRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});