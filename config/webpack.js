var webpack = require('webpack');
var HtmlPlugin   = require('html-webpack-plugin');
var path = require('path');
var rootPath = process.env.PWD;
var appPath = path.join(rootPath, 'src', 'client');
var jshintReporter = require('jshint-loader-stylish')({});

module.exports = {
    /** entry points */
    entry: {
        application: path.join(appPath, 'app.js'),
        vendors: path.join(appPath, 'vendors.js')
    },
    /** output system */
    output: {
        path: path.join(rootPath, 'build', 'client'),
        filename: '[name].[hash].js',
        chunkFilename: '[id].bundle.[chunkhash].js'
    },

    devServer: {
        contenBase: 'src'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.es6'],
        modulesDirectories: ['node_modules'],
        alias: {}
    },
    /** load plugins */
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'),
        // new TextPlugin('[name].[chunkhash].css'),
        // new Manifest(path.join(rootPath + '/config', 'manifest.json'), {
        //     rootAssetPath: appPath,
        //     ignorePaths: ['.DS_Store']
        // }),
        // create instance for entrypoint index.html building
        new HtmlPlugin({
            chunks: ['application', 'vendors'],
            filename: 'index.html',
            template: path.join(appPath, 'index.html')
        })
    ],
    jshint : {
        reporter : jshintReporter
    }
};
