var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var glob = require('glob');

console.log('dev')

const getEntry = (globPath) => {
  var arr = glob.sync(globPath)
  const entries = {}
  arr.forEach((entry) => {
    let pathname = entry.split('/').splice(-1).join('/').split('.')[0]
    entries[pathname] = [entry]
  })
  return entries
}
const entries = getEntry('./src/**/entries/*.js')

const webpackConfig = {
  entry: entries,
  output: {
    path: path.join(__dirname, '/dev'),
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
    // new HtmlWebpackPlugin({
    //   template: 'index.html',
    //   filename: 'index.html',
    //   alwaysWriteToDisk: true,
    //   chunks: ['index']
    // }),
    // new HtmlWebpackPlugin({
    //   template: 'index.html',
    //   filename: 'page.html',
    //   alwaysWriteToDisk: true,
    //   chunks: ['page']
    // }),
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

const chunks = Object.keys(webpackConfig.entry)
chunks.forEach((pathname) => {
  // if (pathname === 'vendor') {
  //   return
  // }
  console.log('pathname', pathname)
  let conf = {
    filename: pathname + '.html',
    template: './index.ejs',
    alwaysWriteToDisk: true,
    chunks: [pathname]
  }
  // if (pathname in webpackConfig.entry) {
  //   conf.chunks = ['vendor', pathname]
  // }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = webpackConfig
