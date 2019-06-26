var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const server = app.listen(8888, () => console.log('Listening on Port 8888'))

// tokens and what not
let spotifyClientId = '255e11455d834fd58fc95e40a522a031'
let spotifySecretId = '721315dad7fa4d55b81475700fc5b4c7'
let scope = 'user-top-read%20user-library-modify%20user-read-private'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.get('/status', function (req, res) {
	res.send("app is running")
});

function requestSpotifyAuth(){
    var options = { method: 'GET',
      url: 'https://accounts.spotify.com/authorize',
      qs:
       { client_id: spotifyClientId,
         response_type: 'code',
         redirect_uri: 'https://localhost:8888/callback',
         scopes: scope } }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}


module.exports = app;
