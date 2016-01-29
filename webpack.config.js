"use strict";

var webpack = require("webpack");
var yargs = require("yargs");
var pjson = require("./package.json");
var UglifyJsPlugin = require("webpack").optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");

var args = yargs.alias("p", "production").argv;
var environment = args.production ? "production" : "development";
var dev = (environment === "development");
console.log("Environment: %s", environment);
console.log("Application: %s@%s", pjson.name, pjson.version);

// -----------------------------------------------------------------------------
// Predefine loaders

var jsxLoader = {
    test: /\.jsx$/,
    loader: "babel"
};

// Process all local (src) JS with Babel - used ES6
var es6Loader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel"
};

var cssLoader = {
    test: /\.css$/,
    loader: "style!css"
};

var lessLoader = {
    test: /\.less$/,
    loader: "style!css!less"
};

var woffLoader = {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff"
};

var woff2Loader = {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff"
};

var ttfLoader = {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?name=fonts/[name].[ext]&limit=10000&minetype=application/octet-stream"
};

var eotLoader = {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: "file?name=fonts/[name].[ext]"
};

var svgLoader = {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?name=fonts/[name]&limit=10000&minetype=image/svg+xml"
};

// -----------------------------------------------------------------------------
// Predefine plugins

var definePlugin = new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify(environment),
    APP_NAME: JSON.stringify(pjson.name),
    APP_VERSION: JSON.stringify(pjson.version),
});


var htmlDevPlugin = new HtmlWebpackPlugin({
    title: pjson.name,
    filename: "index.html",
    template: "./src/index.html",
    inject: "body",
    hash: false,
    minify: false
});

var htmlProPlugin = new HtmlWebpackPlugin({
    title: pjson.name,
    filename: "index.html",
    template: "./src/index.html",
    inject: "body",
    hash: false, // used BUNDLE_VERSION
    minify: { // https://github.com/kangax/html-minifier#options-quick-reference
        preserveLineBreaks: true,
        collapseWhitespace: true,
        removeComments: true
    }
});

var uglifyPlugin = new UglifyJsPlugin({
    compress: {
        warnings: false
    }
});


//TODO: Check OccurenceOrderPlugin functionality from Redux starter kit
var occurenceOrderPlugin = new webpack.optimize.OccurenceOrderPlugin();
var hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
var noErrorsPlugin =  new webpack.NoErrorsPlugin();

// -----------------------------------------------------------------------------
// Configure variables by environment


var plugins = dev ? [
    htmlDevPlugin,
    definePlugin,
    occurenceOrderPlugin,
    hotModuleReplacementPlugin,
    noErrorsPlugin
] : [
    uglifyPlugin,
    htmlProPlugin,
    definePlugin
];
//TODO: Check differences between eval-source-map and cheap-module-eval-source-map
//var devtool = dev ? "eval-source-map" : ""; // = sources map for Chrome
var devtool = dev ? "cheap-module-eval-source-map" : ""; // = sources map for Chrome
var cache = dev;
var debug = dev;
// input file
var entry = dev ? [
    //"eventsource-polyfill", // necessary for hot reloading with IE
    "webpack-hot-middleware/client",
    "./src/index"
] : "./src/index.js";

// output file
var output = {
    //path: "./app",
    path: __dirname + '/',
    filename: "bundle-" + pjson.version + ".js"
};

// how find module in require
var resolve = {
    // try find files with these extensions
    extensions: ["", ".js", ".jsx", ".es6"],
    // load modules from these directories
    modulesDirectories: ["node_modules"]
};

// -----------------------------------------------------------------------------
// Webpack main configuration

module.exports = {
    entry: entry,
    output: output,
    resolve: resolve,
    module: {
        loaders: [
            jsxLoader,
            es6Loader,
            cssLoader,
            lessLoader,
            woffLoader,
            woff2Loader,
            ttfLoader,
            eotLoader,
            svgLoader
        ]
    },
    plugins: plugins,
    cache: cache,
    debug: debug,
    devtool: devtool
};
