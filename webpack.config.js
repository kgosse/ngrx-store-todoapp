var path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
  entry: {
    'main': './src/main.ts',
    'vendor': './src/vendor.ts'
  },
  output: {
    path: "./dist",
    filename: "bundle.js"
  },
  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html'
    })       
  ],

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ],
    noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
  },

  devServer: {
    historyApiFallback: true
  }
};
