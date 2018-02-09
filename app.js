var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var http = require('http');
var login = require('./routes/login');
var admin = require('./routes/admin');
var item = require('./routes/item');
var agent = require('./routes/agent');
var order = require('./routes/order');
var search = require('./routes/search');
var maixiandb = require('./db/maixiandb');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/admin', admin);
app.use('/item', item);
app.use('/agent', agent);
app.use('/order', order);
app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

//connect database
maixiandb.connectdb();
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
server.listen(3001);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  console.log('Listening on ', addr);
}

module.exports = app;
