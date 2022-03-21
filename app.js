var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var app = express();

app.set('view engine', 'ejs');
app.use(logger('dev'));
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
app.use('/assets', express.static('public'))
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
 
module.exports = app;