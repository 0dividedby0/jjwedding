var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('cors'); 

var adminRouter = require('./routes/admin.js');
var partyRouter = require('./routes/party.js');
var guestsRouter = require('./routes/guests.js');
var commentsRouter = require('./routes/comments.js');
var pinsRouter = require('./routes/pins.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/admin', adminRouter);
app.use('/party', partyRouter);
app.use('/guests', guestsRouter);
app.use('/comments', commentsRouter);
app.use('/pins', pinsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
