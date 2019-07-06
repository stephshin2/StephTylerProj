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
const front_url = "http://localhost:3000/"
const back_url = "http://localhost:8888/"

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

app.get('/', function(req, res){
    var code = req.query.code || null
    var authOptions = {
        code: code,
        url: 'https://accounts.spotify.com/api/token',
        form: {
            redirect_uri: `${back_url}/callback`,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer('682367fe3a8a41a0b81f34dc5c6fe936' + ':' + '96b5123b508a42f4b450b9b600341ab6').toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        let refresh_token = '';
        if (!error && response.statusCode === 200) {
            refresh_token = body.refresh_token;
        } else {
            refresh_token = "invalid refresh token";
        }
        res.redirect(`${front_url}/plan-trip?refresh_token=${refresh_token}`)
    });

})

app.get('/callback', function(req, res){
  var code = req.query.code || null
  var authOptions = {
    code: code,
    url: 'https://accounts.spotify.com/api/token',
    form: {
        redirect_uri: `${back_url}/callback`,
        grant_type: 'authorization_code'
    },
    headers: {
        'Authorization': 'Basic ' + (new Buffer('682367fe3a8a41a0b81f34dc5c6fe936' + ':' + '96b5123b508a42f4b450b9b600341ab6').toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    let refresh_token = '';
    if (!error && response.statusCode === 200) {
        refresh_token = body.refresh_token;
    } else {
        refresh_token = "invalid refresh token";
    }
    res.redirect(`${front_url}?refresh_token=${refresh_token}`)
  });
})



module.exports = app;
