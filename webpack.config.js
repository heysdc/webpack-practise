var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[hash].js',
    publicPath: path.join(__dirname, '/dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader"
      //   })
      // },
      {
          test: /\.scss$/,
          use: [{
              loader: 'style-loader' // creates style nodes from JS strings
          }, {
              loader: 'css-loader' // translates CSS into CommonJS
          }, {
              loader: 'sass-loader' // compiles Sass to CSS
          }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: [{ loader: 'ng-annotate-loader', options: { es6: true } }, 'babel-loader']
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['babel-plugin-angularjs-annotate']
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.min.[contenthash].css"),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      filename: 'build.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].min.js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    })
  ]
};
