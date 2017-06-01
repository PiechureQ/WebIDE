var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    lessMiddleware = require('less-middleware'),
    fs = require('fs'),

    index = require('./routes/index'),

    app = express(),
    http = require('http'),
    server = http.Server(app),
    io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(    logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.set('port', process.env.PORT || 3000);

app.use(function (req, res, next){
    next();
});

//handle socket.io conections
io.sockets.on('connection', function (socket) {
    socket.on('sendText', function (data) {
        console.log(data);

        fs.writeFile('./files/test.txt', data.content, 'utf8', (err) => {
            if (err) throw err;
            console.log("file saved and ready to download");
        });
    });
});

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

    //render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {app: app, server: server};