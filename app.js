'use strict';

const path = require('path');

// Express
const express = require('express');
const app = express();

// Locals
const environment = require('./config/environment');
const config = environment(process.env.NODE_ENV);

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logger
const logger = require('morgan');
app.use(logger('dev'));

// Cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Favicon
const favicon = require('serve-favicon');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// development error handler
if ( config.environment === 'development' ) {
    app.use(function(err, req, res, next) {
        if ( err.status === 404 ) {
            res.render('404');
        } else {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                errors: []
            });
        }
    });
}

// production error handler
app.use(function(err, req, res, next) {
    if ( err.status === 404 ) {
        res.render('404');
    } else {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    }
});

// LISTEN
app.listen( config.port, config.ip, function() {
  console.log( 'Express server listening config as '+ config.environment + ' on: ' + config.ip + ':' +config.port );
});
