
 // eslint-disable-line strict

const path = require('path');
const webpack = require('webpack');

const WebpackToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackToolsConfig = require('./webpack.isomorphic.tools');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Globals
const NODE_ENV = process.env.NODE_ENV || 'development';
const DEV = NODE_ENV !== 'production';
const PROD = NODE_ENV === 'production';
const SERVER = false;
const CLIENT = true;

let config;

if (DEV) {
  config = {
    context: path.join(__dirname, 'src'),
    entry: {
      app: [
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        './client.jsx',
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: ['react', ['es2015', { modules: false }], 'stage-0'],
            plugins: ['react-hot-loader/babel'],
          },
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader?modules&localIdentName=[local]__[hash:base64:4]&importLoaders=1&sourceMap',
            'postcss-loader',
            'sass-loader?sourceMap',
          ],
        },
      ],
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        DEV,
        PROD,
        SERVER,
        CLIENT,
      }),
      new WebpackToolsPlugin(webpackToolsConfig).development(DEV),
    ],
    devtool: 'inline-source-map',
  };
}

if (PROD) {
  config = {
    context: path.join(__dirname, 'src'),
    entry: {
      app: './client.jsx',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.[chunkhash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: ['react', ['es2015', { modules: false }], 'stage-0'],
          },
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?modules&localIdentName=[hash:base64:4]&importLoaders=1&sourceMap',
              'postcss-loader',
              'sass-loader?sourceMap',
            ],
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('app.[contenthash:20].css'),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        DEV,
        PROD,
        SERVER,
        CLIENT,
      }),
      new WebpackToolsPlugin(webpackToolsConfig).development(DEV),
    ],
    devtool: 'source-map',
  };
}

module.exports = config;
