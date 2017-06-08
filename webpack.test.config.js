var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var glob = require('glob');

console.log('dev')

// const getEntry = (globPath) => {
//   glob.sync(globPath).forEach((entry) => {
//     let pathname = entry.split('/').splice(-1).join('/').split('.')[0]
//     console.log('pathname', pathname)
//     entries[pathname] = [entry]
//   })
//   console.log(entries)
//   return entries
// }
// const entries = getEntry('./src/**/entries/*.js')

module.exports = {
  entry: {
    index: './Test/index.js',
  },
  output: {
    path: path.join(__dirname, '/testBuild'),
    filename: '[name].[hash].js'
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
      // {
      //     test: /\.scss$/,
      //     use: [{
      //         loader: 'style-loader' // creates style nodes from JS strings
      //     }, {
      //         loader: 'css-loader' // translates CSS into CommonJS
      //     }, {
      //         loader: 'sass-loader' // compiles Sass to CSS
      //     }]
      // },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   // use: [{ loader: 'ng-annotate-loader', options: { es6: true } }, 'babel-loader']
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['env'],
      //       plugins: ['babel-plugin-angularjs-annotate']
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './Test/ejs.html',
      filename: 'html-loader!index.html',
      alwaysWriteToDisk: true,
      chunks: ['index'],
      title: 'test'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor-[hash].min.js',
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: false,
    //   }
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
};
