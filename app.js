var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var clientsRouter = require('./routes/clients');
var entreprisesRouter = require('./routes/entreprises');
var paperAdvRouter = require('./routes/paperAdvancements');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/clients', clientsRouter);
app.use('/entreprises', entreprisesRouter);
app.use('/paperAdvancements', paperAdvRouter);

app.use(express.static(__dirname + '/public'));
app.use('/CinImg', express.static('CinImg'));
module.exports = app;
