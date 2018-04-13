var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var http = require('http');
var https = require('https');
var fs = require('fs');

var login = require('./routes/login');
var index = require('./routes/index');
var item = require('./routes/item');
var agent = require('./routes/agent');
var order = require('./routes/order');
var banner = require('./routes/banner');
var search = require('./routes/search');

var mongoose = require('mongoose').set('debug', true);
mongoose.Promise = require('bluebird');

const connect = mongoose.connect('mongodb://mxphy:mxccyangche1234!@localhost:24404/maixiandb');
connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => { console.log(err);});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/index', index);
app.use('/banner', banner);
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

/**
 * Create server.
 */
/*var httpserver = http.createServer(app);
httpserver.listen(8080);
httpserver.on('listening', onHttpListening);*/

var httpsserver = https.createServer({pfx:fs.readFileSync('./certificate/IIS/www.ccyangche.com.pfx'), passphrase:"ccyangche1234!"}, app);
httpsserver.listen(13333);
httpsserver.on('listening', onHttpsListening);

/**
 * Event listener for HTTP server "listening" event.
 */

/*function onHttpListening() {
  var addr = httpserver.address();
  console.log('Listening on ', addr);
}*/

function onHttpsListening() {
  var addr = httpsserver.address();
  console.log('Listening on ', addr);
}

module.exports = app;
