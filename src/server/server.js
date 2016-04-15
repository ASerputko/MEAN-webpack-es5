var express = require('express');
var path = require('path');
var logger = require('morgan');
var env = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', path.join(__dirname, '..', 'client'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.get('/api/info', function(req, res) {
    res.send({
        version: '1.0.1',
        env: env
    });
});

if (env === 'webpack') {
    app.use(express.static(path.join(__dirname, '..', '..', 'build', 'client')));

    var webpackMiddleware = require('webpack-dev-middleware');
    var webpack = require('webpack');
    var config = require(path.join(__dirname, '..', '..', 'config', 'webpack.js'));

    app.use(webpackMiddleware(webpack(config), {
        publickPath: '/build',
        headers: {
            'X-Custom-Webpack-Header': 'yes'
        },
        stats: {
            colors: true
        }
    }));
} else {
    app.use(express.static(path.join(__dirname, '..', 'client')));
}

// app.use(function(req, res, next) {
//     var error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

app.listen(3000, function() {
    console.log('listening on port 3000');
});
