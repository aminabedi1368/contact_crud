var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const middleware = require('./src/middleware/index');
const history = require('./src/middleware/history');


var indexRouter = require('./routes/index');
var contactRouter = require('./routes/V1/contact');
var nearbyRouter = require('./routes/V1/nearby');
var historyRouter = require('./routes/V1/history');
var dummydata = require('./routes/V1/dummydata');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static('favicon.png'));

app.use(cors());

app.use('/', indexRouter);
app.use('/dummydata', dummydata);

app.use(middleware.decodeToken);

app.get('/api/tasks', (req, res) => {

    return res.json({
        tasks: [
            {
                title: 'Task1',
            },
            {
                title: 'Task2',
            },
        ],
    });
});

app.use('/v1', history);
app.use('/v1/nearby', nearbyRouter);
app.use('/v1/history', historyRouter);
app.use('/v1/contacts', contactRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


