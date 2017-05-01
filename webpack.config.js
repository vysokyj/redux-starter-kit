"use strict";

var webpack = require("webpack");
var yargs = require("yargs");
var pjson = require("./package.json");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var args = yargs.alias("p", "production").argv;
var environment = args.production ? "production" : "development";
var dev = (environment === "development");
console.log("Environment: %s", environment);
console.log("Application: %s@%s", pjson.name, pjson.version);

process.env.BABEL_ENV = environment;
process.env.NODE_ENV = environment;

var SOURCE_DIR = __dirname + "/src";
var TARGET_DIR = __dirname + "/public";

// -----------------------------------------------------------------------------
// Predefine loaders

var jsxLoader = {
    test: /\.jsx$/,
    loaders: dev ? ["react-hot-loader", "babel-loader"] : ["babel-loader"]
};

// Process all local (src) JS with Babel - used ES6
var es6Loader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader"
};

var cssLoader = {
    test: /\.css$/,
    loader: "style-loader!css-loader"
};

var sassLoader = {
    test: /\.scss$/,
    loader: "style-loader!css-loader!sass-loader"
};

var woffLoader = {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff"
};

var woff2Loader = {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff"
};

var ttfLoader = {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?name=fonts/[name].[ext]&limit=10000&minetype=application/octet-stream"
};

var eotLoader = {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: "file-loader?name=fonts/[name].[ext]"
};

var svgLoader = {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?name=fonts/[name]&limit=10000&minetype=image/svg+xml"
};

// -----------------------------------------------------------------------------
// Predefine plugins

var definePlugin = new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify(environment),
    APP_NAME: JSON.stringify(pjson.name),
    APP_VERSION: JSON.stringify(pjson.version),
    'process.env.NODE_ENV': JSON.stringify(environment),
    'process.env.BABEL_ENV': JSON.stringify(environment)
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

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});
//TODO: Check OccurenceOrderPlugin functionality from Redux starter kit
var loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
  debug: dev
});
var occurenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();
var hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
var noErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();


// -----------------------------------------------------------------------------
// Configure variables by environment

var plugins = dev ? [
    loaderOptionsPlugin,
    htmlDevPlugin,
    definePlugin,
    occurenceOrderPlugin,
    hotModuleReplacementPlugin,
    noErrorsPlugin
] : [
    loaderOptionsPlugin,
    uglifyPlugin,
    htmlProPlugin,
    definePlugin
];
//TODO: Check differences between eval-source-map and cheap-module-eval-source-map
//var devtool = dev ? "eval-source-map" : ""; // = sources map for Chrome
var devtool = dev ? "cheap-module-eval-source-map" : ""; // = sources map for Chrome
var cache = dev;
var debug = dev;

// input
var entry = dev ? [
    //"eventsource-polyfill", // necessary for hot reloading with IE
    //"webpack-hot-middleware/client?reload=true", // reload when fails
    "webpack-hot-middleware/client",
    SOURCE_DIR + "/devIndex"
] : SOURCE_DIR + "/index";

// output
var output = {
    //path: "./app",
    path: TARGET_DIR,
    filename: "bundle-" + pjson.version + ".js"
};

// how find module in require
var resolve = {
    // try find files with these extensions
    //extensions: ["", ".js", ".jsx", ".es6"],
    extensions: [ ".js", ".jsx"],
    //TODO: Removed from webpack 2
    // load modules from these directories
    //modulesDirectories: ["node_modules"]
    modules: [
      "node_modules"
    ]
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
            sassLoader,
            woffLoader,
            woff2Loader,
            ttfLoader,
            eotLoader,
            svgLoader
        ]
    },
    plugins: plugins,
    cache: cache,
    devtool: devtool
};
