var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context : path.join(__dirname, 'src/Resources/assets/'),
  entry : {
    fancytree : './js/jquery.cmf_tree.js'
  },
  output : {
    path : path.resolve(__dirname, 'src/Resources/public/js'),
    filename : 'cmf_tree_browser.[name].js'
  },
  externals : {
    'jquery' : 'jQuery'
  },
  module : {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      },
      {
        test : /(assets|Tests).+?\.js$/i,
        use: {
          loader : 'babel-loader', query : {presets : ['es2015']}
        }
      },
      {
        test : /\.(jpe?g|png|gif|svg)$/i,
        use:  'file-loader?name=../img/[hash].[ext]&context=default'
      }
    ]
  },
  resolve : {
    alias : {
      jquery : path.join(__dirname, 'bower_components/jquery/dist/jquery.js'),
      'jquery-ui' : path.join(__dirname, 'bower_components/jquery-ui/jquery-ui.js'),
      fancytree : path.join(__dirname, 'bower_components/fancytree/dist'),
      'core-js' : path.join(__dirname, 'node_modules/core-js')
    }
  },
  plugins : [
    new ExtractTextPlugin({filename: '../css/cmf_tree_browser.[name].css'})
  ]
};
